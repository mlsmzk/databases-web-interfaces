// start app with 'node server.js' or 'npm run dev' in a terminal window
// go to http://localhost:port/ to view your deployment!
// every time you change something in server.js and save, your deployment will automatically reload

// to exit, type 'ctrl + c', then press the enter key in a terminal window
// if you're prompted with 'terminate batch job (y/n)?', type 'y', then press the enter key in the same terminal

// standard modules, loaded from node_modules
const path = require('path');
require("dotenv").config({ path: path.join(process.env.HOME, '.cs304env')});
const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// our modules loaded from cwd

const { Connection } = require('./connection');
const cs304 = require('./cs304');

// Create and configure the app

const app = express();

// Morgan reports the final status code of a request's response
app.use(morgan('tiny'));

app.use(cs304.logStartRequest);

// This handles POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cs304.logRequestData);  // tell the user about any request data

app.use(serveStatic('public'));
app.set('view engine', 'ejs');

const mongoUri = cs304.getMongoUri();

// ================================================================
// custom routes here

// Use these constants and mispellings become errors
const WMDB = "wmdb";
const PEOPLE = "people";
const MOVIES = "movies";

// main page. just has links to two other pages
app.get('/', (req, res) => {
    return res.render('index.ejs');
});

function personDescription(person) {
    let p = person;
    // adding this means that the UTC value works for our timezone
    const NY_offset = 'T05:00:00.000Z'; 
    let bday = (new Date(p.birthdate+NY_offset)).toLocaleDateString();
    return `${p.name} (${p.nm}) born on ${bday}`;
}

// list all people in the wmdb.people table

app.get('/nm/:personid', async (req, res) => {
    const personid = req.params.personid;
    const db = await Connection.open(mongoUri, WMDB);
    const people = db.collection(PEOPLE);
    let person_list = await people.find({nm: parseInt(personid)}).toArray();
    // res.send('id: ' + req.params.personid);
    let now = new Date();
    let nowStr = now.toLocaleString();
    return res.render('person_list.ejs',
                      {listDescription: `all people as of ${nowStr}`,
                       list: person_list});
});

app.get('/tt/:movieid', async (req, res) => {
    const movieid = req.params.movieid;
    const db = await Connection.open(mongoUri, WMDB);
    const movies = db.collection(MOVIES);
    let movie_list = await movies.find({tt: parseInt(movieid)}).toArray();
    // res.send('id: ' + req.params.personid);
    let now = new Date();
    let nowStr = now.toLocaleString();
    return res.render('movie_list.ejs',
                      {listDescription: `all movies as of ${nowStr}`,
                       list: movie_list});
});
    
app.get('/submit', async (req, res) => {
    let id = req.query.id;
    let kind = req.query.kind;
    const db = await Connection.open(mongoUri, WMDB);
    
    if (kind === "person name") {
        const people = db.collection(PEOPLE);
        const reg = new RegExp(id, "i");
        let person_list = await people.find({name: reg}).toArray();
        switch (person_list.length) {
            case 0:
                console.log("No results!");
                return res.render('index.ejs');
            case 1:
                let idno = person_list[0].nm;
                return res.redirect("/nm/" + idno);
            default:
                return res.render('list.ejs', {listDescription: "people matching " + id,
                                               id,
                                               kind,
                                               list: person_list});
        }
    } else if (kind === "movie title") {
        const movies = db.collection(MOVIES);
        const reg = new RegExp(id, "i");
        let movie_list = await movies.find({title: reg}).toArray();
        switch (movie_list.length) {
            case 0:
                console.log("No results!");
                return res.render('index.ejs');
            case 1:
                let idno = movie_list[0].tt;
                return res.redirect("/tt/" + idno);
            default:
                return res.render('list.ejs', {listDescription: "List of movies matching" + id,
                                               id,
                                               kind,
                                               list: movie_list});
        }
    }
}
);

// This function filters a list of dictionaries for those with the correct targetMonth.
// The target month is 1-based, so January = 1, etc. 

function peopleBornInMonth(dictionaryList, targetMonth) {
    function isRightMonth(p) {
        let bd = new Date(p.birthdate);
        // have to remember to add 1 to getMonth() since it's zero-based
        return bd.getMonth()+1 == targetMonth;
    }
    return dictionaryList.filter(isRightMonth);
}

app.get('/people-born-in/:monthNumber', async (req, res) => {
    const monthNumber = req.params.monthNumber;
    // need to figure out flashing better. For now, just a console.log
    if( ! ( monthNumber && monthNumber >= 1 && monthNumber <= 12 )) {
        console.log("bad monthNumber", monthNumber);
        return res.send(`<em>error</em> ${monthNumber} is not valid`);
    }
    const db = await Connection.open(mongoUri, WMDB);
    const people = db.collection(PEOPLE);
    // not the most efficient approach; better to search in the database
    let all = await people.find({}).toArray();
    let chosen = peopleBornInMonth(all, monthNumber);
    let descriptions = chosen.map(personDescription);
    let now = new Date();
    let nowStr = now.toLocaleString();
    let num = descriptions.length;
    console.log('len', descriptions.length, 'first', descriptions[0]);
    return res.render('list.ejs',
                      {listDescription: `${num} people born in ${monthNames[monthNumber]}`,
                       list: descriptions});
});
    
// This gets data from the form submission and redirects to the one above
app.get('/people-born-in-month/', (req, res) => {
    let monthNumber = req.query.month;
    if( ! ( monthNumber && monthNumber >= 1 && monthNumber <= 12 )) {
        console.log("bad monthNumber", monthNumber);
        return res.send(`<em>error</em> ${monthNumber} is not valid`);
    }
    console.log('monthNumber', monthNumber, 'redirecting');
    res.redirect('/people-born-in/'+monthNumber);
});
    
app.get('/staffList/', async (req, res) => {
    const db = await Connection.open(mongoUri, WMDB);
    const staff = db.collection(STAFF);
    let all = await staff.find({}).toArray();
    let names = all.map((doc) => doc.name);
    console.log('len', all.length, 'first', all[0]);
    return res.render('list.ejs',
                      {listDescription: 'all staff',
                       list: names});
});

// ================================================================
// postlude

const serverPort = cs304.getPort(8080);

// this is last, because it never returns
app.listen(serverPort, function() {
    console.log(`listening on ${serverPort}`);
    console.log(`visit http://cs.wellesley.edu:${serverPort}/`);
    console.log(`or http://localhost:${serverPort}/`);
    console.log('^C to exit');
});
