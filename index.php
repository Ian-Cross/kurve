<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Kurvë</title>

        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/colors.css">
        <link rel="stylesheet" href="css/clock.css">
        <link rel="stylesheet" href="css/weather.css">
        <link rel="stylesheet" href="css/grocery-chart.css">

        <script src="js/jquery.min.js"></script>
        <script src="js/functions.js"></script>
        <script src="js/grocery-chart.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    </head>

    <body onload="startScreen()">
        <div class="full_container fullscreen">
            <div class="container_fluid">
                <div class="status-bar">
                    <div  class="time_container col-xs-6">
                        <div id="time"></div>
                        <div id="date"></div>
                    </div>
                    <div class="weather_container col-xs-6">
                        <img id="weatherImage" alt="Weather Icon" onclick="startWeather()"/>
                        <div id="weatherTemp"></div>
                    </div>
                </div>
                <div class="clear-space"></div>
                <div class="app-container">
                    <div class="appBall grocery-chart-app"><div class="grocery-chart-icon"></div></div>
                    <div class="appBall"><div class="memo"></div></div>
                    <div class="appBall"><div class="bus"></div></div>
                    <div class="appBall"><div class="music"></div></div>
                    <div class="appBall"><div class=""></div></div>
                    <div class="clear-space"></div>
                    <div class="appBall bg-white"><div class="facebook"></div></div>
                    <div class="appBall bg-white"><div class="twitter"></div></div>
                    <div class="appBall bg-white"><div class="gmail"></div></div>
                    <div class="appBall"><div class="spotify"></div></div>
                    <div class="appBall"><div class=""></div></div>
                </div>
            </div>
        </div>
        <div class="modal-background fullscreen hidden"></div>
        <div class="grocery-chart-modal-container hidden"></div>
        <div class="clear-space"></div>
    </body>
</html>
