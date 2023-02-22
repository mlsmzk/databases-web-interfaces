// Mary, Miles

function rpsJudge(c1, computer) {
    // write a function, rpsJudge, to compare two choices (rock, paper, or scissors) as strings, returning 0 on a tie, 1 if the second argument wins, and -1 if the first argument wins. (Or some other encoding.)
    if (c1 === computer) {
        return 0
    }
    switch (c1) {
        case "rock":
            switch (computer) {
                case "scissors":
                    return -1;
                case "paper":
                    return 1;
            }
        case "scissors":
            switch (computer) {
                case "rock":
                    return 1;
                case "paper":
                    return -1;
            }
        case "paper":
            switch (computer) {
                case "rock":
                    return -1;
                case "scissors":
                    return 1;
            }
    }
}

function randomElt() {
    // implement a randomElt function to return a random elemnt of an array (see below)
    let choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random()*choices.length)];
}

function highlightPlayerChoice(choice) {
    // write a function, highlightPlayerChoice that, given a player's choice as a string, puts a blue border around the choice image. Note that I used a simple trick to get this so that the page doesn't jump around when you do the highlighting. Start (in the static CSS) with a white border around each image/button. Then, the highlighting is just to change the border-color to blue. Then it's exactly the same size, so the layout is identical.
    $("[data-choice=" + choice + "]").one().css("border-color", "blue");
}

function showComputerChoice(computer_choice) {
    // write a function, showComputerChoice that, given the computer's choice as a string, sets the computer image. This is similar to what we did in class with the flowers.
    $("#computerThrow").attr("src", "rps-images/" + computer_choice + ".png")
}

function resetRPS() {
    // Sets all the player choices back to a white border and clears the previous message.
    $("#player").find(".throw").css("border-color","white");
}

function startOver() {
    // write a function, startOver, to reset the scores (you'll use this when the game starts over). It should also reset the game.
    // add the latter function as an event handler for the "startOver" button
    resetRPS();
    $("#game_so_far").find("#num_wins").text("0");
    $("#game_so_far").find("#num_losses").text("0");
    $("#game_so_far").find("#num_ties").text("0");
}

function updateScores(outcome) {
    // write a function, updateScores to update the page with the current scores.
    let current_text = 1;
    switch (outcome) {
        case -1:
            current_text = $("#game_so_far").find("#num_wins").val() + 1;
            $("#game_so_far").find("#num_wins").text(current_text.toString());
            break;
        case 0:
            current_text = $("#game_so_far").find("#num_ties").val() + 1;
            $("#game_so_far").find("#num_ties").text(current_text.toString());
            break;
        case 1:
            current_text = $("#game_so_far").find("#num_losses").val() + 1;
            $("#game_so_far").find("#num_losses").text(current_text.toString());
            break;
        }
}

function rpsJudgeTester() {
    let tests = [ ["rock", "rock", 0],
                  ["rock", "paper", 1],
                  ["rock", "scissors", -1],
                  ["paper", "rock", -1],
                  ["paper", "paper", 0],
                  ["paper", "scissors", 1],
                  ["scissors", "rock", 1],
                  ["scissors", "scissors", 0],
                  ["scissors", "paper", -1] ];
    tests.forEach((arr) => {
        let [p1, p2, correct_result] = arr;
        let your_result = rpsJudge(p1, p2);
        let outcome = (your_result == correct_result) ? "CORRECT": "WRONG";
        console.log(`for ${p1} versus ${p2}, you computed ${your_result} which is ${outcome}`);
    });
}

function playerTurn(e) {
    // Simulates one round of rock paper scissors given the player's choice as a string.
    // uses resetRPS to reset the game to start the turn
    // uses highlightPlayerChoice to highlights the player's choice
    // uses randomElt to determines the computer's choice
    // uses showComputerChoice to display that choice
    // uses rpsJudge to compare the choices to see who won
    // updates the scores (global variables)
    // uses updateScores to update the score display
    // inserts a message on the page saying the outcome
    
    console.log(r);
    resetRPS();
    highlightPlayerChoice();
    let computer_choice = randomElt();
    showComputerChoice(computer_choice);
    let outcome = rpsJudge(choice, computer_choice);
    updateScores(outcome);
}

startOver();
$().on("click", highlightPlayerChoice);
$("#startOver").on("click", startOver);
$(".throw").on("click", playerTurn);