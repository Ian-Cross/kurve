<?php

header('Content-Type: application/json');

function getItems($ip, $database) {
    $con = new mysqli($ip, "root", "sys", $database);
    $message = $con->query("SELECT * FROM groceries");
    $con->close();
    return $message;
}

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) {

    switch($_POST['functionname']) {
        case 'getItems':

            if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $aResult['error'] = 'Error in arguments!';
            }
            else {
                $aResult['result'] = getItems($_POST['arguments'][0], $_POST['arguments'][1]);
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

echo json_encode($aResult);

?>
