var taskObj = {};
// Use moment.js to display the current day in the header
$("#currentDay").text(moment().format("MMMM Do YYYY"));

// function to check time of and Color code time blocks
var colorCode = function (hourEl, taskEl) {
  var currentHour = moment().hour();
  var hourDue = moment(hourEl, "hhA").hour();

  // console.log(hourDue > currentHour);

  if (moment(currentHour).isAfter(hourDue)) {
    $(taskEl).addClass("bg-secondary");
  } else if (moment(currentHour).isBefore(hourDue)) {
    $(taskEl).addClass("bg-success");
  } else if (moment(currentHour).isSame(hourDue)) {
    $(taskEl).addClass("bg-danger");
  }
};

// audit each block to color code
var auditBlock = function () {
  $(".time-block").each(function () {
    var hourEl = $("#time").text();
    var taskEl = $("#text");
    //var taskText = $().text().trim();
    console.log(hourEl, taskEl);
    colorCode(hourEl, taskEl);
  });
};

auditBlock();

// clicking a task lets you edit the text
$(".description").on("click", "p", function () {
  // get current text of p element
  var text = $(this).text().trim();

  // replace p element with a new textarea
  var textInput = $("<textarea>").addClass("form-control").val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

// clicking off a task returns it to a p element
$(".description").on("blur", "textarea", function () {
  // get current value of textarea
  var text = $(this).val();

  // recreate p element
  var taskP = $("<p>").addClass("m-1 text").text(text);

  // replace textarea with new content
  $(this).replaceWith(taskP);
});

// function that saves tasks to local storage
var saveTask = function () {
  localStorage.setItem("taskObj", JSON.stringify(taskObj));
};

// loads tasks on refresh
var loadTask = function () {
  taskObj = JSON.parse(localStorage.getItem("tasksObj"));
};

// click save button to save to local storage
$(".saveBtn").on("click", function () {
  console.log("click");
  //var hourEl = $().text();
  //var taskEl = $().text();
  //console.log(hourEl, taskEl);

  taskObj.push({
    text: taskEl,
    hour: hourEl,
  });

  saveTask();
});

var endDay = moment().hour(0);
var clearTasks = function () {
  localStorage.clear();
};

// clear tasks at end of day
setInterval(function () {
  clearTasks();
}, endDay);

loadTask();

// audit task due time every 60 minutes
setInterval(function () {
  auditBlock();
}, 3600000);
