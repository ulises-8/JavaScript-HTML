/*
Purpose   : Plays Mastermind (TermProject)
Developer : Ulises Marian
Created   : 11/26/21
*/


function showhelp() {
//When user presses the "Help" button, open a new window showing instructions
  new_window = window.open("", "_blank", "width=300, height=400, scrollbars=yes");
  new_window.location = 'UserHelp.htm';
}

//counts which turn it is
var counter = 0;

function newgame() {
//function to RESET/RESTART the game
  counter = 0;
  clues = "";
  var message = "document.myForm.sInfo.value=''";
  eval(message);
  for (i=1; i < 11; i++) {
    print_guess = "document.myForm.Data" + i + ".value='?';";
    eval(print_guess);
    print_clues = "document.myForm.Clue" + i + ".value='?';";
    eval(print_clues);
  }
  for (i=1; i <= 4; i++) {
    document.images["Ans" + i].src = "QuestionRectangle.GIF";
  }
  computers_pick();
}

function initialize() {
//check if browser supports images, and fill in guesses and clues with a '?'
  if (document.images == false) {
  alert("This browser doesn't support images. \n" +
        "Page will not work properly. \n" +
        "Upgrade your browser.");
  }
  for (i=1; i < 11; i++) {
    print_guess = "document.myForm.Data" + i + ".value='?';";
    eval(print_guess);
    print_clues = "document.myForm.Clue" + i + ".value='?';";
    eval(print_clues);
  }
  computers_pick();
}

/*global variable that stores the color (gif) that is in selectedcolor()
so that pastecolor() can use it. */
var color_gif;
/* global var that saves the color argument from selectedcolor(),
to be used in pastecolor() */
var selected_color;

function selectedcolor(color) {
//grabs the color of the box selected

  // if (document.cookie) {
  //   read_cookie();
  // }

  if ( (clues == "XXXX") || (counter == 10) ) {
    alert("Game Over. Click Restart Game to start a new game.")
    return
  }

  color_gif = document.images["color" + color.slice(0,1)].src;
  var message = `document.myForm.sInfo.value='Selected: ${color}';`;
  eval(message);
  selected_color = color;
}

function pastecolor(number) {
//pastes selected color into the selected answer box

  // if (document.cookie) {
  //   read_it();
  // }

  if ( (clues == "XXXX") || (counter == 10) ) {
    alert("Game Over. Click Restart Game to start a new game.")
    return
  }

  document.images["Ans" + number].src = color_gif;
  var message = `document.myForm.sInfo.value='Pasted: ${selected_color}';`;
  eval(message);
}

var guesses = [];  //array that holds all four selected colors
var guesses_copy = [];
var previous_guesses = [[]]; //saves the four colors of the prior turn

function checkanswer() {
  //grabs all four selected colors and saves them into an array, and checks them.

  // if (document.cookie) {
  //   read_it();
  // }

  if ( (clues == "XXXX") || (counter == 10) ) {
    alert("Game Over. Click Restart Game to start a new game.")
    return
  }

  var check = all_boxes_selected(); //if there is a box not selected, send alert
  if (check == false) {
    return
  }
  guesses = [];  //empty guesses each time user checks answer, since it gets modified.
  guesses_copy = [];
  var get_color; //grabs the color of box selected
  const number = [1, 2, 3, 4];
  for (i=0; i < number.length; i++) {
    get_color = document.images["Ans" + number[i]].src;
    get_index = get_color.lastIndexOf("/");
    the_color = get_color[get_index + 1]
    guesses.push(the_color);
    guesses_copy.push(the_color);
    previous_guesses.push([the_color]);
   }
  check_p = check_previous();
  //if selected guess is equal to the last guess, send alert to player.
  if (check_p == false) {
    var message = "document.myForm.sInfo.value='Submited same guess. Change Answer Boxes Colors.';";
    eval(message);
    return
  }
  counter += 1; //increase counter by one if valid guess is selected
  compare(); //compare guess to computer's pick
}

function all_boxes_selected() {
//checks if all four boxes/colors were selected
  var count_boxes = 0;
  var possibilities = ['B','W','R','P','G','Y'];
  for (i=1; i <= 4; i++) {
    var box = document.images["Ans" + i].src;
    get_index = box.lastIndexOf("/");
    the_color = box[get_index + 1];
    for(k=0; k < possibilities.length; k++) {
      if (the_color == possibilities[k]) {
        count_boxes += 1;
      }
    }
  }
    if (count_boxes != 4) {
      alert("All Answer Boxes must be filled with a Color prior to Check Answer.");
      return false;
    }
}

function check_previous() {
//checks if selected guess is equal to the last guess, if so, sends alert.
  var count = counter;
  if (count > 0) {
    saving = eval(`document.myForm.Data${count}.value`);
    if (guesses_copy.join(' ') == saving) {
      alert("Submited same guess. Change Answer Boxes Colors.");
      return false;
    }
  }
}

var random_four = [];  //the four colors selected by the computer

function computers_pick() {
//selects four colors randomly, to be compared to the player's guess.
  random_four = []; //empty random_four each time game is restarted, so array only has four colors
  possibilities = ['B','W','R','P','G','Y'];
  var i;
  var pick = 0;
  for (i=0; i <= 3; i++) {
    pick = Math.floor(Math.random()*6);
    random_four.push(possibilities[pick]);
  }
}

var clues = "";
var copy_random_four = [];  //copy that will be compared to user's guess

function compare() {
//compares user's guess to computer's pick
  clues = "";    //empty clues each time user checks answer
  copy_random_four = [];   //empty list of lists each time user checks answer
  copy_random_four.push(random_four);
  secret_four = copy_random_four[0].slice(0);
  for (i=0; i <= 3; i++) {
    if (guesses[i] == secret_four[i]) {
      clues += "X"   //correct color and position, add an "X" to clues
      guesses[i] = "."   //and substitute the color with a "."
      secret_four[i] = "."  //and substitute the color with a "."
    }
  }
  compare_color();
}

function compare_color() {
//checks if there are correct colors in the wrong position, if so, substitutes them with a "."
  for (i=0; i < guesses.length; i++) {
    for (j=0; j < secret_four.length; j++) {
      if ((guesses[i] == ".") & (secret_four[j] == ".")) {
      //if correct color has already been found, skip iteration (so as not to duplicate it)
           continue;
      }
      if (guesses[i] == secret_four[j]) {
        guesses[i] = "."
        secret_four[j] = "."
        clues += "O";    //add an "O" to clues if correct color in wrong position
      }
    }
  }
  display_guesses_clues();
}


function display_guesses_clues() {
//displays the user's guesses and their corresponding clues, per turn.
  guesses_copy = guesses_copy.join(' ');
  show_guess = `document.myForm.Data${counter}.value='${guesses_copy}';`;
  eval(show_guess);
  show_clue = `document.myForm.Clue${counter}.value='${clues}';`;
  eval(show_clue);
  message();
}

function message() {
//selects which message to print depending on whether user wins, and if so, in which turn, or if they lose.
  var winning_messages = ["skip index zero",
  "You won: WOW! You should play the lottery!",
  "You won! Congrats! You are so lucky. The lottery is waiting for you!",
  "You won! Wonderful! You are very lucky!",
  "You won! Your logic skills are fantastic!",
  "You won! Very Good! I envy your logic skills!",
  "You won! Nicely Done! I still envy your logic skills!",
  "You won! Your logic skills are doing well.",
  "You won! Great progress! Keep working on those logic skills!",
  "You won! Well done! Your logic skills are improving!",
  "You won! That was your last chance! You got lucky!"
];

  const winner = "XXXX";
  if (clues == winner) {
    the_msg = winning_messages[counter]
    var message = `document.myForm.sInfo.value='${the_msg} Answer was: ${random_four.join('')}';`;
    eval(message);
    //set_cookie();
    return
  }
  if ((counter == 10) & (clues != winner)) {
    var message = `document.myForm.sInfo.value='You LOST!\
    Answer was: ${random_four.join('')}. "Hit Restart Game to start a new game!"';`;
    eval(message);
    //set_cookie();
    return
  }
  var message = `document.myForm.sInfo.value='Checked Guesses. Turn #: ${counter} completed.';`;
  eval(message);
}

// function set_cookie() {
//   const winner = "XXXX";
//   if ((clues == winner) || (((counter == 10) & (clues != winner))) ) {
//     const game_over = "Game Over. Click Restart Game to start a new game."
//     let the_cookie = "game_over_cookie=" + encodeURIComponent(game_over);
//     let exp_date = ";expires=Mon 25 Mar 2013 16:00:00 UTC";
//     the_cookie += exp_date;
//     document.cookie = the_cookie;
//   }
// }
//
// function read_cookie() {
//   if (document.cookie) {
//     let my_cookie = document.cookie;
//     let the_name = my_cookie.split("=");
//     alert(decodeURIComponent(the_name[1]));
//   }
// }
