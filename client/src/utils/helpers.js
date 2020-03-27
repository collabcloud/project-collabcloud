export function timeToDate(timestamp) {
  var date;
  if (timestamp.length < 10) return "";

  const year = timestamp.slice(0, 4);
  var month = timestamp.slice(5, 7);
  var day = timestamp.slice(8, 10);

  if (month === "01") {
    month = "January ";
  } else if (month === "02") {
    month = "February ";
  } else if (month === "03") {
    month = "March ";
  } else if (month === "04") {
    month = "April ";
  } else if (month === "05") {
    month = "May ";
  } else if (month === "06") {
    month = "June ";
  } else if (month === "07") {
    month = "July ";
  } else if (month === "08") {
    month = "August ";
  } else if (month === "09") {
    month = "September ";
  } else if (month === "10") {
    month = "October ";
  } else if (month === "11") {
    month = "November ";
  } else if (month === "12") {
    month = "December ";
  }

  const first_digit = parseInt(day.slice(0, 1));
  const second_digit = parseInt(day.slice(1, 2));
  var days = "" + first_digit + ("" + second_digit);
  if (first_digit !== 1 && second_digit === 1) {
    days = days + "st ";
  } else if (first_digit !== 1 && second_digit === 1) {
    days = days + "nd ";
  } else if (first_digit !== 1 && second_digit === 3) {
    days = days + "rd ";
  } else {
    days = days + "th ";
  }
  date = month + days + year;

  return date;
}

export function generateURL(subforum, title, isParent) {
  const subforum_url =
    "/forum/" +
    subforum
      .toLowerCase()
      .split(" ")
      .join("-") +
    "/";
  if (isParent) {
    return subforum_url;
  }
  const url =
    subforum_url +
    title
      .replace("?", "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "/";

  return url;
}

export function convertToTitle(str) {
  var words = str.split("-");
  const first_word = words[0][0].toUpperCase() + words[0].slice(1);
  var new_title = first_word;

  for (var i = 1; i < words.length; i++) {
    new_title += " " + words[i][0].toUpperCase() + words[i].slice(1);
  }
  return new_title;
}
