
function loadSpotify() {
    var data = "";
    $(".spotify-modal-container").html(data);
}

function hideSpotify() {
    $('.spotify-modal-container').addClass('hidden');
};

$(document).ready(function() {
    $('.spotify-app').click(function(){
        window.open('https://open.spotify.com/browse/featured','Kurve').focus()
        //updateVisibleModalBackground();
        //$('.spotify-modal-container').toggleClass('hidden');
    });
});
