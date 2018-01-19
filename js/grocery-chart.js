var box = null;

function loadItems() {

    var items = [];

    alert(JSON.stringify({functionname: 'getItems', arguments: ['something','nothing']}));

    jQuery.ajax({
        type: "POST",
        url: 'database.php',
        dataType: 'json',
        async: false,
        data: JSON.stringify({functionname: 'getItems', arguments: ["something","nothing"] }),

        success: function (obj, textstatus) {
            if ( !('error' in obj) ) {
                console.log(obj);
                /*for (var key in obj) {
                    if (obj[key].item) {
                        items.push(obj[key]);
                    }
                }*/
            } else {
                console.log("Bad: " + obj);
            }
        }
    });
    var num_items = items.length;

    console.log(items);

    var data = "<div class='bought-item-container hidden'>" +
               "    <div onclick='subGroceryCounter()' class='subtract'>-</div>" +
               "    <div onclick='addGroceryCounter()' class='add'>+</div>" +
               "    <div class='triangle'></div>" +
               "</div>" +
               "<div class='grocery-chart'>" +
               "    <table class='grocery-table text-center'>" +
               "        <tr>" +
               "            <th>Items</th>" +
               "            <th>Ian</th>" +
               "            <th>Mark</th>" +
               "            <th>Liam</th>" +
               "            <th>Dean</th>" +
               "        </tr>";


    for (i = 0; i < num_items; i++) {
        var ianTally = "";
        var markTally = "";
        var liamTally = "";
        var deanTally = "";

         if (items[i].Ian.includes("I"))  ianTally = "tally-mark";
        if (items[i].Mark.includes("I")) markTally = "tally-mark";
        if (items[i].Liam.includes("I")) liamTally = "tally-mark";
        if (items[i].Dean.includes("I")) deanTally = "tally-mark";

        data = data + "<tr><td class='item'>" + items[i].item + "</td>" +
        "<td id='" + + "' class='" + ianTally + "' onclick='openGroceryCounter(this)'>" + items[i].Ian + "</td>" +
        "<td class='" + markTally + "' onclick='openGroceryCounter(this)'>" + items[i].Mark + "</td>" +
        "<td class='" + liamTally + "' onclick='openGroceryCounter(this)'>" + items[i].Liam + "</td>" +
        "<td class='" + deanTally + "' onclick='openGroceryCounter(this)'>" + items[i].Dean + "</td></tr>";
    }
    data = data + "</table></div>";

    $(".grocery-chart-modal-container").html(data);
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
        case "x":
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
            box.innerHTML = "x"
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
            box.innerHTML = "x"
            box.classList.remove("tally-mark");
            break;
        default:
            box.innerHTML = " "
            break;
    };
    updateDatabase()
}

function updateDatabase() {
    alert(box.cellIndex);
}

$(document).ready(function(){
    $('.grocery-chart-app').click(function(){
        updateVisibleModalBackground();
        $('.grocery-chart-modal-container').toggleClass('hidden');
    });
});
