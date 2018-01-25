var box = null;

function tableLookup(functionname, args) {

    var promiseObj = new RSVP.Promise(function (resolve, reject) {
        params = "";

        if (args != null) {
            for (x in args) {
                params += ("&" + x + "=" + args[x]);
            }
        }

        jQuery.ajax({
            type: "POST",
            url: 'database.php?functionname=' + functionname + params,
            traditional: true,
            dataType: "json",

            success: function (obj, textstatus) {
                if ( !('error' in obj) ) {
                    resolve(obj);
                } else {
                    reject(obj);
                }
            }
        });
    });
    return promiseObj;
}

function loadItems() {

    console.log("start of Load Items");

    var itemList = tableLookup("listItems",null);

    itemList.then( function (itemListObj) {
        var userList = tableLookup("listUsers",null);

        userList.then( function (userListObject) {
            buildTable(itemListObj,userListObject);
        }).catch (function(userListError){
            console.log("userList Error")
        })
    }).catch ( function (itemListError) {
        console.log("itemList Error");
    })

    console.log("end of Load Items");
}

function buildTable(itemsListObj, usersListObj) {

    console.log("Building Table");

    numItems = Object.keys(itemsListObj).length - 1;
    numUsers = Object.keys(usersListObj).length - 1;

    var data = "<div class='bought-item-container hidden'>" +
               "    <div onclick='subGroceryCounter()' class='subtract'>-</div>" +
               "    <div onclick='addGroceryCounter()' class='add'>+</div>" +
               "    <div class='triangle'></div>" +
               "</div>" +
               "<div class='grocery-chart'>" +
               "    <table class='grocery-table text-center'>" +
               "        <tr>" +
               "            <th>Items</th>";

    for (user = 0; user < numUsers; user++) {
       userName = usersListObj[user].Name;
       data += ("<th>" + userName + "</th>");
    }
    data += "</tr>";

    var itemUser = tableLookup("getItems",null);

    itemUser.then(function (itemUserObj){

        var chart = new Array(numItems);

        for (i = 0; i < numItems; i++) {
            chart[i] = new Array(numUsers*5);
            chart[i].fill(" ");
            for (j = 0; j < numUsers*5; j+=5) {
                chart[i][j] = i+1;
                chart[i][j+1] = j/5+1;
            }
        }

        console.log(chart);

        for (itemUser in itemUserObj) {
            if (!itemUserObj[itemUser].User) break;
            userId = Number(itemUserObj[itemUser].User);
            itemId = Number(itemUserObj[itemUser].Item);
            itemUserId = Number(itemUserObj[itemUser].id);
            valueNum = Number(itemUserObj[itemUser].Value);
            valueStr = " ";

            switch (valueNum) {
                case -1:
                    valueStr = "X";
                    break;
                case 1:
                    valueStr = "I";
                    break;
                case 2:
                    valueStr = "II";
                    break;
                case 3:
                    valueStr = "III";
                    break;
                default:
                    valueStr = " ";
                    break;
            }
            chart[itemId-1][userId*5-1] = valueStr;
            if (valueStr.includes("I")) chart[itemId-1][userId*5-2] = "class='tally-mark'";
            chart[itemId-1][userId*5-3] = itemUserId;
        }

        for (item = 0; item < numItems; item++) {
            itemName = itemsListObj[item].Name;
            data += ("<tr><td>" + itemName + "</td>");

            for (user = 0; user < numUsers*5; user+=5) {
                data += ("<td onclick='openGroceryCounter(this)' " + chart[item][user+3] + ">" + chart[item][user+4] + "</td>" +
                        "<td id='itemUserId' style='display:none' tabIndex='" + chart[item][user+2] + "'></td>" +
                        "<td id='userId' style='display:none' tabIndex='" + chart[item][user+1] + "'></td>" +
                        "<td id='itemId' style='display:none' tabIndex='" + chart[item][user] + "'></td>" );
            }
            data += "</tr>";
        }
        data = data + "</table></div>";
        $(".grocery-chart-modal-container").html(data);

    }).catch(function (itemUserError){
        console.log("itemUser Error");
    });
}

function hideGroceryChart() {
    $('.grocery-chart-modal-container').addClass('hidden');
    $('.bought-item-container').addClass('hidden');
};

function openGroceryCounter(operator) {
    var opPos = findPos(operator);
    var boxPos = findPos(box);
    if (box != null && opPos[0] == boxPos[0] && opPos[1] == boxPos[1]) {
        $(".bought-item-container").toggleClass('hidden');
    } else {
        box = operator;
        //show the pop up and move to correct location
        $(".bought-item-container").removeClass('hidden');
        var pos = $(".grocery-chart-modal-container").position();
        $(".bought-item-container").css({top: (opPos[0] - pos.top - 80) + "px", left: (opPos[1] - pos.left - 10) + "px"});
    };
}

function addGroceryCounter() {
    //need to make smarter
    switch (box.innerHTML) {
        case " ":
            box.innerHTML = "X";
            break;
        case "X":
            box.innerHTML = "I"
            box.classList.add("tally-mark");
            break;
        case "I":
            box.innerHTML = "II"
            break;
        case "II":
            box.innerHTML = "III"
            break;
        default:
            box.classList.remove("tally-mark");
            box.innerHTML = " "
            break;
    };
    updateDatabase();
}

function subGroceryCounter() {
    switch (box.innerHTML) {
        case "III":
            box.innerHTML = "II"
            break;
        case "II":
            box.innerHTML = "I"
            break;
        case "I":
            box.innerHTML = "X"
            box.classList.remove("tally-mark");
            break;
        default:
            box.innerHTML = " "
            break;
    };
    updateDatabase()
}

function updateDatabase() {
    console.log("Starting Database Update");

    var value;
    switch (box.innerHTML) {
        case "X":
            value = -1;
            break;
        case "I":
            value = 1;
            break;
        case "II":
            value = 2;
            break;
        case "III":
            value = 3;
            break;
        default:
            value = -1;
            break;
    }

    itemUser = box.nextSibling;
    user = itemUser.nextSibling;
    item = user.nextSibling;

    var itemUserId = itemUser.tabIndex;
    if (itemUserId == "-1") itemUserId = "";

    console.log(itemUser.id + ":" + itemUserId + ":" + user.id + ":" + user.tabIndex + ":" + item.id + ":" + item.tabIndex + ":");
    var updatePromise = tableLookup("updateValue",[itemUserId,user.tabIndex,item.tabIndex,value]);

    updatePromise.then( function(obj) {
        console.log(obj.result);
        if (obj.result.queryType == "Insert") {
            itemUser.tabIndex = obj.result.newId;
            user.tabIndex = obj.result.user;
            item.tabIndex = obj.result.item;
        } else if (obj.result.queryType == "Delete") {
            itemUser.tabIndex = "";
            user.tabIndex = obj.result.user;
            item.tabIndex = obj.result.item;
        }
    }).catch( function(obj){
        console.log(obj);
    });
    console.log("Finishing Database Update");
}

$(document).ready(function(){
    $('.grocery-chart-app').click(function(){
        updateVisibleModalBackground();
        $('.grocery-chart-modal-container').toggleClass('hidden');
    });
});
