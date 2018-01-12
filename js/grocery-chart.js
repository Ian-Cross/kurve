var box = null;

function loadItems() {

    var items = [];

    jQuery.ajax({
        type: "POST",
        url: 'database.php',
        dataType: 'json',
        async: false,
        data: {functionname: 'getItems', arguments: ['127.0.0.1', 'kurve']},

        success: function (obj, textstatus) {
                      if ( !('error' in obj) ) {
                          //console.log(obj);
                          for (var key in obj) {
                              if (obj[key].item) {
                                  items.push(obj[key]);
                              }
                          }
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
        data = data + "<tr><td class='item'>" + items[i].item + "</td><td onclick='openGroceryCounter(this)'>" + items[i].Ian + "</td><td onclick='openGroceryCounter(this)'>" + items[i].Mark + "</td><td onclick='openGroceryCounter(this)'>" + items[i].Liam + "</td><td onclick='openGroceryCounter(this)'>" + items[i].Dean + "</td></tr>"
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
            box.innerHTML = "X"
            break;
    };
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
}

$(document).ready(function(){
    $('.grocery-chart-app').click(function(){
        updateVisibleModalBackground();
        $('.grocery-chart-modal-container').toggleClass('hidden');
    });
});
