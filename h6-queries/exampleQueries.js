// standard modules, loaded from node_modules
const path = require('path');
require("dotenv").config({ path: path.join(process.env.HOME, '.cs304env')});
const { Connection } = require('./connection');
const cs304 = require('./cs304');
const mongoUri = cs304.getMongoUri();

// ================================================================

// In the movie_lens_db, return an array of all movies released in 2010, sorted by title in ascending order.

// main should print the number of movies and the first one.

function moviesFrom2010() {
  return db.movie_lens_db
    .find({title: {$regex : /2010/}}, {sort: {title: 1}})
    .toArray();             // convert data to array to work with it in nodejs
}

// In the movie_lens_db, return an array of all comedies released in 2010, sorted by title in ascending order.

// main should print the number of movies and the first one.

function findComedies2010() {
  const re1 = new RegExp("2010", "i");
  const re2 = new RegExp("comedy", "i");
  return db                           // identify database (in this case, an argument)
    .collection("movie")              // use movie collection
    .find({title: re1, genres: re2})  // match titles and genres
    .project({title: 1, genres: 1})   // only return title and genre fields
    .sort({title: 1})                 // sort by title in ascending alphabetical order
    .toArray();                       // convert data to array to work with it in nodejs
}


// In the movie_lens_db, return an array of all movies rated by the user with id 610. Sort by rating in descending order and then by movie title in ascending order alphabetically.

// main should print the number of movies and the first one, which will be the alphabetically first 5-star movie (if any).

async function ratings610(db) {
    return db                           // identify database (in this case, an argument)
    .collection("movie")              // use movie collection
    .find({tags: {userId : 610}}, {})  // match titles and genres
    .project({title: 1});
}

/** Finds the youngest person in the WMDB collection. Computes in
 * Mongo and just gets one.
 */



async function youngestPersonMongo(db) {
  // find the youngest person in the wmdb database's people collection
  const youngest = await db           // identify db (in this case, a stored variable)
    .collection("people")             // use people collection
    .find()                           // find all entries
    .project({name: 1, birthdate: 1}) // only return name and birthdate fields
    .sort({birthdate: -1})            // sort by birthdate descending (most to least recent)
    .limit(1)                         // only return the "top field" 
    .toArray();                       // convert data to array to work with it in nodejs
    // data is returned in an array, so return the first (and only) element
  return youngest[0]; 
}

async function mostCredits(db) {
  // find person with most credits in wmdb
  const people = await db           // identify db (in this case, a stored variable)
    .collection("people")           // use people collection
    .find()                         // find all entries
    .project({name: 1, movies: 1})  // only return name and movies fields
    .toArray();                     // convert data to array to work with it in nodejs

  let longest = {name: "", movies_length: 0}; // starting value
  people.forEach(person => {                  // iterate over each found person
    if (person.movies !== undefined) {
      if (person.movies.length > longest.movies_length) { // if they're in more movies
        longest.name = person.name;                       // replace longest
        longest.movies_length = person.movies.length;
      }
    }
  }) 

  return longest;
}

async function peopleOlderThanDate(db, dateString) {
  // find all people in wmdb born after dateString 
  const people = await db             // define db (in this case, a stored variable)
    .collection("people")             // use people collection
    .find()                           // find all entries
    .project({name: 1, birthdate: 1}) // only return name and birthdate fields
    .toArray();                       // 

  dateObj = new Date(dateString);
  let youngins = people.filter((person) => {
    return Date.parse(person.birthdate) > dateObj; // remove any people born before 2000
  });

  return youngins;
}

/** find all people in wmdb with NM >= given value
 */

function peopleMinId(db, minId) {
  return db                                       // define db (in this case, a stored variable)
    .collection("people")                         // use people collection
    .find({nm: {$gte: minId}})                    // find all people with nm >= minId
    .project({nm: 1, name: 1, birthdate: 1})      // only return nm, name and birthdate fields
    .toArray();                                   // 
}

/** find all movies with TT <= given value
 */

function moviesMaxId(db, maxId) {
  return db                       // define db (in this case, a stored variable)
    .collection("movies")          // use movies collection
    .find({tt: {$lte: maxId}})      // find all entries with TT < maxId
    .project({title: 1, tt: 1})   // only return title and tt fields
    .toArray();                   // convert data to array to work with it in nodejs
}

async function main() {

    console.log('starting function check...\n');

    const movie_lens_db = await Connection.open(mongoUri, 'movie_lens_db');
    q1 = await moviesFrom2010();
    q2 = 
    await Connection.close();

    console.log("\n");

    const wmdb = await Connection.open(mongoUri, 'wmdb');
    q6 = await youngestPerson(wmdb);
    console.log("youngestPerson",
                "the youngest person in wmdb is " + q6.name + ", born on " + q6.birthdate);
    q6mongo = await youngestPersonMongo(wmdb);
    console.log("youngestPersonMongo",
                "the youngest person is " + q6mongo.name + ", born on " + q6mongo.birthdate);
    q7 = await mostCredits(wmdb);
    console.log("mostCredits ",
                q7.name + " has the longest credit list of " + q7.movies_length + " movies");
    q8 = await peopleOlderThanDate(wmdb, '2000-01-01');
    console.log("peopleOlderThanDate:",
                q8.length, "people found with birthdates after 2000, such as", q8[0]);
    q9greater = await peopleMinId(wmdb, 10000);  
    console.log("peopleMinId:",
                q9greater.length, "people found with nm > 10000, such as", q9greater[0]);
    q9less = await moviesMaxId(wmdb, 5000);  
    console.log("maxId:",
                q9less.length, "movies found with tt < 5000, such as", q9less[0]);

  await Connection.close();

  console.log("\n");
  
}

main().catch(console.error);
