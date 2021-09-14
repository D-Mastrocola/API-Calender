let date;
let day;
let time;
let timeBlockContainer = $(".container");
let schedule;

let saveIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/></svg>';
let checkIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>';

if (localStorage.getItem("schedule")) {
  schedule = JSON.parse(localStorage.getItem("schedule"));
} else {
  schedule = [
    {
      time: 9,
      text: "",
    },
    {
      time: 10,
      text: "",
    },
    {
      time: 11,
      text: "",
    },
    {
      time: 12,
      text: "",
    },
    {
      time: 13,
      text: "",
    },
    {
      time: 14,
      text: "",
    },
    {
      time: 15,
      text: "",
    },
    {
      time: 16,
      text: "",
    },
    {
      time: 17,
      text: "",
    },
  ];
}

let saveSchedule = () => {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};
saveSchedule();

let setTimeblockState = () => {
  $(".container .timeblock .description").each((i, li) => {
    $(li).removeClass("past present future");
    if (i + 9 < moment().format("k")) {
      $(li).addClass("past");
    } else if (i + 9 > moment().format("k")) {
      $(li).addClass("future");
    } else {
      $(li).addClass("present");
    }
  });
};

let setDate = () => {
  day = moment().dayOfYear();
  date = moment().format("dddd, MMMM Do YYYY");
  time = moment().format("LT");

  $("#currentDay").text(date);
  setTimeblockState();
};
setDate();

setInterval(setDate, 5000);

let createTimeBlock = (hour, text, index) => {
  let blockState;
  if (hour - moment().format("k") < 0) {
    blockState = "past";
  } else if (hour - moment().format("k") > 0) {
    blockState = "future";
  } else {
    blockState = "present";
  }
  let blockTime = moment(day + " " + hour + ":00").format("ha");
  console.log();
  console.log(blockTime);

  let timeblock = $("<li>").addClass("timeblock row col-12");

  let timeblockTime = $("<p>").addClass("hour col-3 col-md-2 col-lg-1 text-right");
  timeblockTime.text(blockTime);
  timeblock.append(timeblockTime);

  let timeblockDesc = $("<div>")
    .addClass(
      "description col-6 col-md-8 col-lg-10 text-dark p-2 " + blockState
    )
    .attr("block-state", blockState)
    .attr("schedule-index", index)
    .attr("hour", hour)
    .text(text);
  timeblock.append(timeblockDesc);

  let timeblockButton = $("<button>")
    .addClass("btn btn-save saveBtn col-3 col-md-2 col-lg-1")
    .attr("schedule-index", index);
  timeblockButton.html(checkIcon);

  timeblock.append(timeblockButton);

  $(timeBlockContainer).append(timeblock);
  timeblock.on("click", ".saveBtn", function () {
    let btn = this
    let desc;
    $(".container .timeblock .description").each((i, div) => {
      if (i == index) {
        $(btn).html(saveIcon);
        desc = $(div).text().trim();
      }
    });
    schedule[index].text = desc;
    saveSchedule();
    $(btn).html(checkIcon);
  });
};
//create a timeblock for 9am to 5pm
for (let i = 0; i < schedule.length; i++) {
  createTimeBlock(schedule[i].time, schedule[i].text, i);
}

$(".container").on("click", "div", function () {
  let blockState = $(this).attr("block-state");
  let desc = $(this).text().trim();
  let index = parseInt($(this).attr("schedule-index"));

  let descInput = $("<textarea>")
    .addClass(
      "form-class col-6 col-md-8 col-lg-10 description text-dark " + blockState
    )
    .attr("block-state", blockState)
    .attr("schedule-index", index)
    .val(desc);

  $(this).replaceWith(descInput);
  descInput.trigger("focus");
  descInput.on("change", () => {
    console.log("event");
  });

  $(".container .timeblock .saveBtn").each((i, btn) => {
    if (i == index) {
      $(btn).html(saveIcon);
    }
  });
});
$(".container").on("blur", "textarea", function () {
  let blockState = $(this).attr("block-state");
  let index = parseInt($(this).attr("schedule-index"));
  let desc = $(this).val();
  let timeblockDesc = $("<div>")
    .addClass(
      "description col-6 col-md-8 col-lg-10 text-dark p-2 " + blockState
    )
    .attr("block-state", blockState)
    .attr("schedule-index", index);
  timeblockDesc.text(desc);
  $(this).replaceWith(timeblockDesc);
});
