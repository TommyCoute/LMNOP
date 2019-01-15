// fix footer height
function fixFooter() {
    $('div#lmnopFooter').css('bottom', 0);
    var ff = $(window).height() - $(document).height();
    $('div#lmnopFooter').css('bottom', ff);
}
window.addEventListener('resize', fixFooter);