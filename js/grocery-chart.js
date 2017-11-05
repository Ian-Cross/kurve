function loadItems() {
    var items = [
        "Milk",
        "Eggs",
        "Butter",
        "Mayonaise",
        "Water Softener Salt",
        "Paper Towels",
        "Toilet Paper",
        "Dish Soap"];
    var num_items = 8;

    var data = "<div class='bought-item-container hidden'>" +
               "    <div class='subtract'>-</div>" +
               "    <div class='add'>+</div>" +
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
        data = data + "<tr><td class='item'>" + items[i] + "</td><td></td><td></td><td></td><td></td></tr>"
    }
    data = data + "</table></div>";

    $(".grocery-chart-modal-container").html(data);
}

function hideGroceryChart() {
    $('.grocery-chart-modal-container').addClass('hidden');
    $('.bought-item-container').addClass('hidden');
};

$(document).ready(function(){

    var box = null;

    $('.grocery-chart-app').click(function(){
        updateVidibleModalBackground();
        $('.grocery-chart-modal-container').toggleClass('hidden');
    });

    $('.grocery-table tr td').click(function() {
        if ($(this).attr("class") == "item"){
            $(".bought-item-container").addClass('hidden');
        } else {
            var position = $(this).position();

            //In the case of click on a box with the pop up already open
            if (box != null && position.top == box.position().top && position.left == box.position().left) {
                $(".bought-item-container").toggleClass('hidden');
            } else {
                box = $(this);

                //show the pop up and move to correct location
                $(".bought-item-container").removeClass('hidden');
                $(".bought-item-container").css({top: (position.top-80) + "px", left: (position.left - 10) + "px"});
            };
        };
    });

    $(".bought-item-container .add").click(function(){
        //need to make smarter
        switch (box.html()) {
            case "X":
                box.html("I");
                box.addClass("tally-mark");
                break;
            case "I":
                box.html("II");
                break;
            case "II":
                box.html("III");
                break;
            default:
                box.html("X");
                break;
        };
    });

    $(".bought-item-container .subtract").click(function(){
        switch (box.html()) {
            case "III":
                box.html("II");
                break;
            case "II":
                box.html("I");
                break;
            case "I":
                box.html("X");
                box.removeClass("tally-mark");
                break;
            default:
                box.html(" ");
                break;
        };
    });
});
