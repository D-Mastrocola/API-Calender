let date;
let day;
let time;
let timeBlockContainer = $(".container-fluid");
let schedule;

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
  let timeBlockContainer = [];
  $(".container .timeblock .description").each((i, li) => {
    $(li).removeClass("past present future");
    console.log($(li));
    if (i < moment().format('k')) {
      $(li).addClass("past");
    } else if (i > moment().format('k')) {
      $(li).addClass("future");
    } else {
      $(li).addClass("present");
    }
  });
  console.log(timeBlockContainer);
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
  console.log()
  console.log(blockTime)

  let timeblock = $("<li>").addClass("timeblock row col-12 m-0");

  let timeblockTime = $("<p>").addClass("hour col-3 col-md-2 col-lg-1");
  timeblockTime.text(blockTime);
  timeblock.append(timeblockTime);

  let timeblockDesc = $("<div>")
    .addClass("description col-6 col-md-8 col-lg-10 text-dark p-2 " + blockState)
    .attr("block-state", blockState)
    .attr('schedule-index', index)
    .attr('hour', hour)
    .text(text);
  timeblock.append(timeblockDesc);

  let timeblockButton = $("<button>").addClass("btn btn-save saveBtn col-3 col-md-2 col-lg-1");
  let timeBlockButtonIcon = $("<span>").addClass("oi oi-check");
  timeblockButton.append(timeBlockButtonIcon);
  timeblock.append(timeblockButton);

  $(timeBlockContainer).append(timeblock);
};
//create a timeblock for 9am to 5pm
for (let i = 0; i < schedule.length; i++) {
  createTimeBlock(schedule[i].time, schedule[i].text, i);
}

$(".container").on("click", "div", function () {
  let blockState = $(this).attr("block-state");
  let desc = $(this).text().trim();
  let index = parseInt($(this).attr('schedule-index'));

  let descInput = $("<textarea>")
    .addClass("form-class col-6 col-md-8 col-lg-10 description text-dark " + blockState)
    .attr("block-state", blockState)
    .attr('schedule-index', index)
    .val(desc);

  $(this).replaceWith(descInput);
  descInput.trigger("focus");
  descInput.on('change', () => {
    console.log('event')
  })
});
$(".container").on("blur", "textarea", function () {
  let blockState = $(this).attr("block-state");
  let index = parseInt($(this).attr('schedule-index'));
  let desc = $(this).val();
  let timeblockDesc = $("<div>")
    .addClass("description col-6 col-md-8 col-lg-10 text-dark p-2 " + blockState)
    .attr("block-state", blockState)
    .attr('schedule-index', index);
  timeblockDesc.text(desc);
  $(this).replaceWith(timeblockDesc);

  schedule[index].text = desc;
  //saveSchedule();
});
