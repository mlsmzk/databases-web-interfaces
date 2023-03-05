function addQuizQuestion(question) {
    let clone = $("#quiz-template").clone();
    clone.removeClass('template')
         .attr('data-ans', question.ANS)
         .find('legend').text(question.Q);
    clone.find('div label input[value="A"]').closest('label').append(question.A);
    clone.find('div label input[value="B"]').closest('label').append(question.B);
    clone.find('div label input[value="C"]').closest('label').append(question.C);
    clone.find('div label input[value="D"]').closest('label').append(question.D);
    clone.appendTo('#myquestions');
}

function checkCorrect(event) {
    let fieldset = $(event.target).closest('fieldset');
    let ans = fieldset.attr('data-ans');
    let resp = fieldset.find('div label input[type=radio]:checked').val();
    if (resp === ans) {
        fieldset.attr('class', 'correct');
    } else {
        fieldset.attr('class', 'incorrect')
    }
}

$("#myquestions").one().on('click', 'button', checkCorrect);
questions.forEach(function (elt, idx) {addQuizQuestion(elt, idx)}); //this puts each question (no answers yet) in the html
// we can pass each one of the answers once each question is added

//wrap each questions with their respective answers. Use <form class="question1">?
// addQuizQuestion(questions[0]);