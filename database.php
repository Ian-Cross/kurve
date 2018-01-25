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

function listItems($con) {
    $itemList = $con->query("SELECT Name FROM Store");
    return $itemList;
}

function listUsers($con) {
    $userList = $con->query("SELECT Name FROM Users");
    return $userList;
}

function updateValue($con,$id,$user,$item,$value) {
    //echo (":$id: :$user: :$item: :$value:");
    if ($id == " " || $id == "") {
        $update = $con->query("INSERT INTO ItemsUsers (user,item,value) VALUES ($user,$item,$value)");
        $queryType = "Insert";
    } else if ($value == " " || $value == "") {
        $update = $con->query("DELETE FROM ItemsUsers WHERE id=$id");
        $queryType = "Delete";
    } else {
        $update = $con->query("UPDATE ItemsUsers SET Value=$value WHERE id=$id");
        $queryType = "Update";
    }

    if ($update == null) $success = "false";
    else $success = "true";

    $results = array();
    $results['queryType'] = $queryType;
    $results['querySuccess'] = $success;
    $results['newId'] = $con->insert_id;
    $results['user'] = $user;
    $results['item'] = $item;
    return $results;
}

$aResult = array();

if( !isset($_GET['functionname']) ) { $aResult['error'] = 'No function name!'; }

if( !isset($aResult['error']) ) {

    switch($_GET['functionname']) {
        case 'getItems':
            $aResult['result'] = getItems($con);
            while($row = $aResult['result']->fetch_assoc()) {
                array_push($aResult, $row);
            }
            break;

        case 'listItems':
            $aResult['result'] = listItems($con);
            while($row = $aResult['result']->fetch_assoc()) {
                array_push($aResult, $row);
            }
            break;

        case 'listUsers':
            $aResult['result'] = listUsers($con);
            while($row = $aResult['result']->fetch_assoc()) {
                array_push($aResult, $row);
            }
            break;

        case 'updateValue':
            $aResult['result'] = updateValue($con,$_GET['0'],$_GET['1'],$_GET['2'],$_GET['3']);
            break;

        default:
           $aResult['error'] = 'Could not find function: '.$_POST['functionname'].'!';
           break;
    }
}

$con->close();
echo json_encode($aResult);

?>
