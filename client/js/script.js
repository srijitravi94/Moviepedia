$(document).click(function(e) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768){
        if (!$(e.target).is('a') && !$(e.target).is('input'))  {
            $('#collapsable-nav').collapse('hide');
        }
    }
});