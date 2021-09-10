let date;
let time;


let setDate = () => {
    date = moment().format('dddd, MMMM Do YYYY');
    time = moment().format('LT');

    $('#currentDay').text(date);
    $('#currentTime').text(time);
}
setDate();

setInterval(setDate, 1000)