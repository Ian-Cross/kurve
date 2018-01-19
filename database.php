<?php

header('Content-Type: application/json');

$file = fopen("credentials.txt", "r");
$ip = trim(fgets($file), "\x00..\x1F");
$database = trim(fgets($file), "\x00..\x1F");
$user = trim(fgets($file), "\x00..\x1F");
$pass = trim(fgets($file), "\x00..\x1F");
fclose($file);

$con = new mysqli($ip, $user, $pass, $database);

function getItems($con) {
    $message = $con->query("SELECT * FROM ItemsUsers");
    return $message;
}

function userLookup() {

}

$aResult = array();

if( !isset($_GET['functionname']) ) { $aResult['error'] = 'No function name!'; }

if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) {

    switch($_GET['functionname']) {
        case 'getItems':
            if ( !is_array($_GET['arguments']) ) {
                $aResult['error'] = 'Error in arguments!';
            } else {
                $aResult['result'] = getItems($con);
                while($row = $aResult['result']->fetch_assoc()) {
                    array_push($aResult, $row);
                }
            }
            break;

        case 'userLookup':

            if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 3) ) {
                $aResult['error'] = 'Error in arguments!';
            } else {
                //$aResult['result'] = userLookup($_POST['arguments'][0], $_POST['arguments'][1],$_POST['arguments'][2]);
                while($row = $aResult['result']->fetch_assoc()) {
                    array_push($aResult, $row);
                }
            }
            break;

        default:
           $aResult['error'] = 'Could not find function: '.$_POST['functionname'].'!';
           break;
    }
}

$con->close();
echo json_encode($aResult);

?>
