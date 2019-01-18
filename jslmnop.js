// fix footer height
function fixFooter() {
    $('div#lmnopFooter').css('bottom', 0);
    var ff = $(window).height() - $(document).height();
    $('div#lmnopFooter').css('bottom', ff);
}
window.addEventListener('resize', fixFooter);
$(document).ready(function() {
    fixFooter();
});

// toggle disclaimer acknowledgement
function toggleDA() {
    var accepted = $('input#confirmation').prop('checked');
    if (accepted) {
        $('.disclaimer a.logout').css('display', 'none');
        $('.disclaimer input.accept').css('display', 'inline-block');
    } else {
        $('.disclaimer input.accept').css('display', 'none');
        $('.disclaimer a.logout').css('display', 'inline-block');
    }
}