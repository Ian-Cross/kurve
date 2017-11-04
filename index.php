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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="js/jquery.min.js"></script>
        <script src="js/functions.js"></script>
        <script src="js/grocery-chart.js"></script>
    </head>

    <body onload="startScreen()">
        <div class="full_container">
            <div class="container_fluid">
                <div class="status-bar">
                    <div  class="time_container col-xs-6">
                        <div id="time"></div>
                        <div id="date"></div>
                    </div>
                    <div class="weather_container col-xs-6">
                        <img id="weatherImage" alt="Weather Icon"/>
                        <div id="weatherTemp"></div>
                    </div>
                </div>
                <div class="clear-space"></div>
                <div class="app-container">
                    <div class="appBall left grocery-chart-app"></div>
                    <div class="appBall right"></div>

                    <div class="clear-space"></div>

                    <div class="appBall left"></div>
                    <div class="appBall right"></div>

                    <div class="clear-space"></div>

                    <div class="appBall left"></div>
                    <div class="appBall right"></div>

                    <div class="clear-space"></div>

                    <div class="appBall left"></div>
                    <div class="appBall right"></div>

                    <div class="clear-space"></div>

                    <div class="appBall left"></div>
                    <div class="appBall right"></div>

                    <div class="clear-space"></div>
                </div>
            </div>
        </div>
        <div class="grocery-chart-modal-container hidden">
            <div class="grocery-chart">
                <table>
                    <tr>
                        <th>Ian</th>
                        <th>Mark</th>
                        <th>Liam</th>
                        <th>Dean</th>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                                <li>Milk</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
</html>
