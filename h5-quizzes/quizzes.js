var questions = [ 
    {Q: "Who starred in Casablanca?",
        A: "Charleton Heston",
        B: "Matt Damon",
        C: "Harrison Ford",
        D: "Humphrey Bogart",
        ANS: "D"
    },
    {Q: "Who won the most Academy Awards (Oscars) for best actress?",
        A: "Meryl Streep",
        B: "Emma Thompson",
        C: "Katharine Hepburn",
        D: "Ingrid Bergman",
    ANS: "C"
    },
    {Q: "What director has won the most Academy Awards?",
        A: "John Ford",
        B: "David Lean",
        C: "Orson Welles",
        D: "Steven Spielberg",
    ANS: "A" // actually A, B and C are correct
    },
    {Q: "Who starred in Good Will Hunting?",
        A: "Charleton Heston",
        B: "Matt Damon",
        C: "Harrison Ford",
        D: "Humphrey Bogart",
    ANS: "B"
    }
];

function addQuestion(el){ //takes one of the elements in the array e.g: questions[0], questions[2]...
    let fieldset = $("<fieldset>");
    let legend = $("<legend>").text(el.Q);
    let divA = $("<div>");
    let divB = $("<div>");
    let divC = $("<div>");
    let divD = $("<div>");
    let labelA = $("<label>").text(el.A);
    let labelB = $("<label>").text(el.B);
    let labelC = $("<label>").text(el.C);
    let labelD = $("<label>").text(el.D);
    let options = [divA, divB, divC, divD];
    let labels = [labelA, labelB, labelC, labelD];
    options.forEach((_, idx) => options[idx].append(labels[idx]));
    
    var inputA = $('<input>', {'type':'radio',
                            'name':'option',
                            'value': 'A'});
    labelA.append(inputA);
    var inputB = $('<input>', {'type':'radio',
                            'name':'option',
                            'value': 'B'});
    labelB.append(inputB);
    var inputC = $('<input>', {'type':'radio',
                            'name':'option',
                            'value': 'C'});
    labelC.append(inputC);
    var inputD = $('<input>', {'type':'radio',
                            'name':'option',
                            'value': 'D'});
    labelD.append(inputD);
    
    options.forEach((o) => $(o).on('click', checkCorrect));
    fieldset.append(legend).attr("data-ans", el.ANS).appendTo('#myquestions');
    options.forEach((o) => fieldset.append(o));
}

function checkCorrect(event) {
    let label = $(event.target).closest('label');
    let ans = $(label).closest('fieldset').attr('data-ans');
    let fieldset = $(label).closest('fieldset');
    if ($(label).find('input').attr('value') === ans) {
        fieldset.attr('class', 'correct');
    } else {
        fieldset.attr('class', 'incorrect')
    }
}

function addClass(elt, correctness) {
/*
Add class, either correct or incorrect to an element
Args:
    elt: HTML element, which will be a label for the purposes of the assignment
    correctness: either "correct" or "incorrect", whichever 
*/
    $(elt).attr('class', correctness);
}


questions.forEach(function (qDict) {addQuestion(qDict)}); //this puts each question (no answers yet) in the html
// we can pass each one of the answers once each question is added

//wrap each questions with their respective answers. Use <form class="question1">?