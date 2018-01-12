function startScreen() {
    startTime();
    startWeather();
    loadItems();
}

function startTime() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var day_of_week = today.getDay();
    var month = today.getMonth();
    var day = today.getDate();

    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    document.getElementById('time').innerHTML =
    '<span id="hour">' + hours + '</span>' +
    '<span id="colon">:</span>' +
    '<span id="minute">' + minutes + '</span>' +
    '<span id="colon2">:</span>' +
    '<span id="second">' + seconds + '</span>';

    switch (day_of_week) {
        case 0:
            day_of_week = "Sunday";
            break;
        case 1:
            day_of_week = "Monday";
            break;
        case 2:
            day_of_week = "Tuesday";
            break;
        case 3:
            day_of_week = "Wednesday";
            break;
        case 4:
            day_of_week = "Thursday";
            break;
        case 5:
            day_of_week = "Friday";
            break;
        case 6:
            day_of_week = "Saturday";
            break;
    }

    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month   = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }

    document.getElementById('date').innerHTML =
    day_of_week + " " + month + " " + day;

    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

//kelvin 273.15 to Celcius 0
function startWeather() {
    $.get( "http://api.openweathermap.org/data/2.5/weather?id=5967629&APPID=59456f5d8340d88b1552e92001c04866", function( data ) {
        //console.log(data.main.temp);
        document.getElementById('weatherImage').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        document.getElementById('weatherTemp').innerHTML = Math.round(data.main.temp - 273.15,2) + "&deg;";
    });
}

function hideAllApps() {
    hideGroceryChart();
    updateVisibleModalBackground();
};

function updateVisibleModalBackground() {
    $(".modal-background").toggleClass('hidden');
};

function findPos(obj) {
    var left = 0;
    var top = 0;

    if (obj && obj.offsetParent){
        do {
            left += obj.offsetLeft;
			top += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [top,left]
}

$(document).ready(function() {

    $(".modal-background").click(function() {
        hideAllApps();
    });

});
