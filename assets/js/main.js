let date;
let day;
let time;
let timeBlockContainer = $('.container')


let setDate = () => {
    day = moment().get('date');
    date = moment().format('dddd, MMMM Do YYYY');
    time = moment().format('LT');
    console.log(date)

    $('#currentDay').text(date);
    $('#currentTime').text(time);
}
setDate();

setInterval(setDate, 1000);


let createTimeBlock = (hour) => {
    let blockTime = moment(day + " " + hour  + ":00").format('ha');

    let timeblock = $('<div>');
    timeblock.addClass('timeblock row col-12');

    let timeblockTime = $('<div>').addClass('hour col-1')
    timeblockTime.text(blockTime);
    timeblock.append(timeblockTime);

    let timeblockDesc = $("<div>");
    timeblockDesc.addClass('description col-10 past');
    timeblock.append(timeblockDesc);

    let timeblockButton = $('<button>')
    timeblockButton.addClass("btn btn-save saveBtn col-1");
    let timeBlockButtonIcon = $('<span>')
    timeBlockButtonIcon.addClass('oi oi-check')
    timeblockButton.append(timeBlockButtonIcon)
    timeblock.append(timeblockButton); 

    $(timeBlockContainer).append(timeblock);
}
//create a timeblock for 9am to 5pm
for(let i = 9; i < 18; i++) {
    createTimeBlock(i);
}
