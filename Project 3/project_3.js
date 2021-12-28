//variable which will contain all dates entered by user
var list_dates = [];

//list of months that have 31 days
var months_31 = [1, 3, 5, 7, 8, 10, 12];

//assigning values to months
var add_to_months31 = new Array();
add_to_months31[1] = 0;
add_to_months31[3] = 3;
add_to_months31[5] = 1;
add_to_months31[7] = 6;
add_to_months31[8] = 2;
add_to_months31[10] = 0;
add_to_months31[12] = 5;

//list of months that have 30 days. Assign each month to matching index.
var months_30 = new Array();
months_30[4] = 4;
months_30[6] = 6;
months_30[9] = 9;
months_30[11] = 11;

//assigning values to months
var add_to_months30 = new Array();
add_to_months30[4] = 6;
add_to_months30[6] = 4;
add_to_months30[9] = 5;
add_to_months30[11] = 3;

//list of all months (names), starting at index 1
var all_months = new Array();
all_months[1] = "January";
all_months[2] = "February";
all_months[3] = "March";
all_months[4] = "April";
all_months[5] = "May";
all_months[6] = "June";
all_months[7] = "July";
all_months[8] = "August";
all_months[9] = "September";
all_months[10] = "October";
all_months[11] = "November";
all_months[12] = "December";

//list of all days of the week
var days_week = new Array();
days_week[0] = "Saturday";
days_week[1] = "Sunday";
days_week[2] = "Monday";
days_week[3] = "Tuesday";
days_week[4] = "Wednesday";
days_week[5] = "Thursday";
days_week[6] = "Friday";

//declaring all variables in global scope, so they can be used inside all functions
var total_sum;
var year;
var month;
var day;
var the_day;

function getYear() {
  //prompt user for year
  total_sum = 0;  //set total_sum to 0 every time New Date button is clicked
  year = window.prompt("Enter the Year (1500-2399) of the Date");
  if (year == null) {
    //if user presses Cancel (null), exit
    return;
  }
  while (year < 1500 || year > 2399 || isNaN(year) || year == "") {
    //if year is outside of range or not a number or an empty string...
    alert("Must select a valid year");
    year = window.prompt("Enter the Year (1500-2399) of the Date");
    if (year == null) {
      return;
  }
}
if ((year >= 1500 && year <= 1599) || (year >= 1900 && year <= 1999) || (year >= 2300 && year <= 2399)) {
  total_sum += 1;
  addYear(year);
  month = getMonth();
  day = getDay(month, year);
  the_day = theDay();
  saveDay();

}
if ((year >= 1800 && year <= 1899) || (year >= 2200 && year <= 2299)) {
  total_sum += 3;
  addYear(year);
  month = getMonth();
  day = getDay(month, year);
  the_day = theDay();
  saveDay();
}
if ((year >= 1700 && year <= 1799) || (year >= 2100 && year <= 2199)) {
  total_sum += 5;
  addYear(year);
  month = getMonth();
  day = getDay(month, year);
  the_day = theDay();
  saveDay();
}
if ((year >= 1600 && year <= 1699) || (year >= 2000 && year <= 2099)) {
  addYear(year);
  month = getMonth();
  day = getDay(month, year);
  the_day = theDay();
  saveDay();
}
}
function addYear(year) {
  //Take the last two digits of the year and divide them by four.
  var last_two = year.slice(-2);     //last two digits
  var divide_by_four = Math.floor(last_two/4); //integer division of last 2 digits
  //force both strings into integers (using "+") and add them
  total_sum += +last_two + +divide_by_four;
}

function getMonth() {
  //Prompt user for month
  month = window.prompt("Enter the Month (1-12) of the Date");
  if (month == null) {
    return;
  }
  while (month < 1 || month > 12 || isNaN(month) || month == "") {
    //trap user inside a loop, until a valid month is entered
    alert("Must select a valid month");
    month = window.prompt("Enter the Month (1-12) of the Date");
    if (month == null) {
      return;
    }
  }
  return month;
}

function getDay(month, year) {
  //prompt user for day
  day = leapYear(month, year); //before prompting for day, check if leap year
  if (day == "january") {
    //leap year January
    total_sum += 6;
    day = window.prompt("Enter the Day (1-31) of the Month");
    if (day == null) {
      return;
    }
    while (day < 1 || day > 31 || isNaN(day) || day == "") {
      alert("Must select a valid day");
      day = window.prompt("Enter the Day (1-31) of the Month");
      if (day == null) {
        return;
      }
    }
    total_sum += +day;
    return day;
  }
  else if (day == "leapyear") {
    //leap year February
    total_sum += 2;
    day = window.prompt("Enter the Day (1-29) of the Month");
    if (day == null) {
      return;
    }
    while (day < 1 || day > 29 || isNaN(day) || day == "") {
      alert("Must select a valid day");
      day = window.prompt("Enter the Day (1-29) of the Month");
      if (day == null) {
        return;
      }
    }
    total_sum += +day;
    return day;
    }
  else if (month == 2) {
    //non-leap-year February
    total_sum += 3;
    day = window.prompt("Enter the Day (1-28) of the Month");
    if (day == null) {
      return;
    }
    while (day < 1 || day > 28 || isNaN(day) || day == "") {
      alert("Must select a valid day");
      day = window.prompt("Enter the Day (1-28) of the Month");
      if (day == null) {
        return;
      }
    }
    total_sum += +day;
    return day;
  }
  //loop to check if month has 31 days
  for (var i=0; i < months_31.length; i++) {
    if (month == months_31[i]) {
      day = window.prompt("Enter the Day (1-31) of the Month");
      if (day == null) {
        return;
      }
      while (day < 1 || day > 31 || isNaN(day) || day == "") {
        alert("Must select a valid day");
        day = window.prompt("Enter the Day (1-31) of the Month");
        if (day == null) {
          return;
        }
      }
      //adding value of month
      total_sum += add_to_months31[month];
      //adding day
      total_sum += +day;
      return day;   //exit (return) function if month has 31 days
    }
  }
  //Using IN operator (along with indexes) to see if month has 30 days.
  if (month in months_30) {
    day = window.prompt("Enter the Day (1-30) of the Month");
    if (day == null) {
      return;
    }
    while (day < 1 || day > 30 || isNaN(day) || day == "") {
      alert("Must select a valid day");
      day = window.prompt("Enter the Day (1-30) of the Month");
      if (day == null) {
        return;
      }
    }
    //adding value of month
    total_sum += add_to_months30[month];
    //adding day
    total_sum += +day;
    return day;    //exit (return) function if month has 30 days
  }
}

function leapYear(month, year) {
  //check whether year is a leap year
  if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
    //check if month entered is january or february
    if (month == 1) {
      return "january";
    }
    if (month == 2) {
      return "leapyear";
    }
  }
}

function theDay() {
  //calculate day of the week
  remainder = total_sum % 7;
  the_day = days_week[remainder];
  return the_day;
}

function saveDay() {
  //save all the dates (day, month, year) entered, in a list.
  if (day == undefined || all_months[month] == undefined || year == undefined) {
    return;
  }
  list_dates.push([`Date: ${all_months[month]} ${day}, ${year} was a ${the_day}.`]);
}

function showDates() {
  //open new window and show user all entered dates (and their days)
  var new_window = window.open("", "_blank");
  //loop over list_dates, to print every date
  new_window.document.write("<h3>Day of Week for Dates Entered:</h3><p>");
  for (i=0; i < list_dates.length; i++) {
    new_window.document.write(list_dates[i] + "<p>");
  }
  new_window.document.write("Close this window to continue...");
}
