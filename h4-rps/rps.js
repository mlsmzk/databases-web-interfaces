// Mary, Miles

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
    $("#computerThrow").attr("src", "rps-images/" + computer_choice + "-200.png")
}

function resetRPS() {
    // Sets all the player choices back to a white border and clears the previous message.
    // Args:
    //  None
    // Returns:
    //  None
    $("#player").find(".throw").css("border-color","white");
}

function startOver() {
    // Reset the scores and game.
    // Args:
    //  None
    // Returns:
    //  None
    resetRPS();
    $("#game_so_far").find("#num_wins").text("0");
    $("#game_so_far").find("#num_losses").text("0");
    $("#game_so_far").find("#num_ties").text("0");
}

function updateScores(outcome) {
    // Update the page with the current scores.
    // Args:
    //  outcome: int representing the outcome of the game which
    //           belongs to [-1, 0, 1]
    // Returns:
    //  None
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
    console.log(evt.target);
    let r = $(evt.target).parent().attr("data-choice");
    highlightPlayerChoice(r);
    let computer_choice = randomElt();
    showComputerChoice(computer_choice);
    let outcome = rpsJudge(r, computer_choice);
    updateScores(outcome);
}

startOver();
$().on("click", highlightPlayerChoice);
$("#startOver").on("click", startOver);
$(".throw").on("click", playerTurn);