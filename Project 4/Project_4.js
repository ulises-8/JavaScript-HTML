/*
Programmer: Ulises Marian
Date : 11/14/2021
Purpose: Read/Validate/Update HTML INPUT controls
*/

function checkform() {
  // Checks form data
  let the_name = document.getElementById('txtname').value;
  let to_match = /^[A-Za-z'\- ]{2,50}$/;
  if ((!to_match.test(the_name)) || the_name == "") {
    alert("Invalid name entered. Please letters only.");
    return false;
  }
  sum = check_boxes();      //catch return value from check_boxes()
  if (sum == false) {
    return false;
  }
  color = option_color();   //catch return value from option_color()
  if (color == false) {
    return false;
  }
  month = get_month();     //catch return value from get_month()
  if (month == false) {
    return false;
  }
  tell_user(the_name, sum, color, month); //pass all returned values as arguments
}

function check_boxes() {
  //checks if at least 2 boxes are checked - and which one(s)
  let count = 0; //count how many checkboxes are checked (need at least 2)
  var sum = 0; //sum of checkbox values
  //iterate over the length of the checkboxes array (which is 4, the # of boxes)
  for (i=0; i < document.myForm.chk.length; i++)
    if (document.myForm.chk[i].checked == true) {
      count++
      sum += +document.myForm.chk[i].value
    }
  if (count < 2) {
    alert("Check at least two chexboxes.");
    return false;
  }
  the_sum = check_total(sum);
  return the_sum;
}

function check_total(sum) {
  //checks that input Total matches the sum of the values of the checked boxes
  if ((sum != document.getElementById('totalsum').value)){
    alert("Incorrect Total! Enter the sum of the values of the checked boxes.")
    return false;
  }
  return document.getElementById('totalsum').value;
}


function option_color() {
  //checks if a color has been selected (and which)
  var list_radio = document.myForm.colors.length;
  for (i=0; i < list_radio; i++)
    if (document.myForm.colors[i].checked == true) {
      return document.myForm.colors[i].value;
  }
  alert("Select a color.");
  return false;
}

function get_month() {
  //checks if a month has been selected (and which)
  var months = document.myForm.sels.length; //saves the length of the array
  for (i=0; i < months; i++)
    if (document.myForm.sels[i].selected == true) {
      return document.myForm.sels[i].value;
    }
  alert("Select a month.");
  return false;
}

function tell_user(the_name, sum, color, month) {
  //sends final message with all input info, if all info is valid
  arguments = [the_name, sum, color, month]
  for (i=0; i < arguments.length; i++) {
    if (arguments[i] == false) {
      return false;
    }
  }
  let final_message = "Your Name: " + the_name + "\n" + "Total Entered: "
   + sum + "\n" + "Color Selected: " + color + "\n" + "Month Selected: " + month
   + "\n\n" + "Data is Valid and being sent to server.";
  alert(final_message);
  return True;
}
