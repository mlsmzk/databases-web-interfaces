// Mary, Miles

let num_wins = 0;
let num_ties = 0;
let num_losses = 0;

startOver();
$().on("click", highlightPlayerChoice);
$("#startOver").on("click", startOver);
$(".throw").on("click", playerTurn);

function rpsJudge(c1, computer) {
    // Compares two rock paper scissors inputs and
    // decides which wins, or if it is a draw.
    // Args:
    //  c1: string representing the first rock, paper, scissors input
    //  computer: string representing the second rock, paper, scissors input
    // Returns:
    //  Integer in [-1, 0, 1] representing the outcome;
    //  -1 means c1 beats computer, 0 means it was a draw, and 1 means
    //  the computer beat c1.
    let map = {"rock" : 0, "paper" : 1, "scissors" : 2};
    let wl_matrix = [[0, 1, -1], [-1, 0, 1], [1, -1, 0]];
    return wl_matrix[map[c1]][map[computer]];
}

function randomElt() {
    // Get a random element from an array.
    // Args:
    //  None
    // Returns:
    //  Array element randomly selected. The type may vary based on the array.
    let choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random()*choices.length)];
}

function highlightPlayerChoice(choice) {
    // Create a blue border around one of rock, paper, or scissors
    // Args:
    //  choice: string from ["rock", "paper", "scissors"] representing the choice
    //          of throw to highlight.
    // Returns:
    //  None
    $("[data-choice=" + choice + "]").one().css("border-color", "blue");
}

function showComputerChoice(computer_choice) {
    // Display the computer's choice of rock, paper, scissors.
    // Args:
    //  computer_choice: string representing the computer's choice.
    //                   It is in the set ["rock", "paper", "scissors"]
    // Returns:
    //  None
    $("#computerThrow").attr("src", "rps-images/" + computer_choice + "-200.png");
}

function resetRPS() {
    // Sets all the player choices back to a white border and clears the previous message.
    // Args:
    //  None
    // Returns:
    //  None
    $("#outcome").text("");
    $("#player").find(".throw").css("border-color","white");
}

function startOver() {
    // Reset the scores and game.
    // Args:
    //  None
    // Returns:
    //  None
    resetRPS();
    $("#computerThrow").attr("src", "rps-images/" + "question" + "-200.png");
    num_wins = 0;
    num_ties = 0;
    num_losses = 0;
    $("#game_so_far").find("#num_wins").text(num_wins.toString());
    $("#game_so_far").find("#num_losses").text(num_losses.toString());
    $("#game_so_far").find("#num_ties").text(num_ties.toString());
}

function updateScores(outcome) {
    // Update the page with the current scores.
    // Args:
    //  outcome: int representing the outcome of the game which
    //           belongs to [-1, 0, 1]
    // Returns:
    //  None
    switch (outcome) {
        case -1:
            num_wins += 1;
            $("#game_so_far").find("#num_wins").text(num_wins.toString());
            break;
        case 0:
            num_ties += 1;
            $("#game_so_far").find("#num_ties").text(num_ties.toString());
            break;
        case 1:
            num_losses += 1;
            $("#game_so_far").find("#num_losses").text(num_losses.toString());
            break;
        }
}

function rpsJudgeTester() {
    // Given function to unit test rpsJudge() function
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

function playerTurn(evt) {
    // Simulates one round of rock paper scissors given the player's choice as a string.
    // First uses resetRPS to reset the game to start the turn, then 
    // uses highlightPlayerChoice to highlights the player's choice.
    // It then generates the computer's choice with randomElt and displays it with
    // showComputerChoice. It finally uses rpsJudge to compare the choices to see who won
    // and updates the scores.
    // Args:
    //  evt: event object representing the click event acting on the images of
    //       rock, paper, and scissors
    // Returns:
    //  None
    resetRPS();
    let r = $(evt.target).parent().attr("data-choice");
    highlightPlayerChoice(r);
    let computer_choice = randomElt();
    showComputerChoice(computer_choice);
    let outcome = rpsJudge(r, computer_choice);
    let map = {"-1" : "You win!", "0" : "Tie", "1" : "Computer wins"};
    $("#outcome").text(map[outcome.toString()]);
    updateScores(outcome);
}

