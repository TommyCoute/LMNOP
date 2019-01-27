// fix footer height
function fixFooter() {
    $('div#lmnopFooter').css('bottom', 0);
    var ff = $(window).height() - $(document).height();
    $('div#lmnopFooter').css('bottom', ff);
}
window.addEventListener('resize', fixFooter);
$(document).ready(function() {
    fixFooter();
    // again after a few seconds
    setTimeout(function() {
        fixFooter();
    }, 3000);
});

// fix login page email fields
$(document).ready(function () {
    $('input[field="email"]').prop('type', 'email');
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

// set date/time using custom input field
$(document).ready(function() {
    $('input[field="inputdate"]').prop('type', 'datetime-local');
    $('input[field="inputdate"]').val($('input[field="displaydate"]').val());
});

// toggle audience contact selection
function toggleContact(id, name) {
    var cids = $('input[field="contactIds"]').val();
    var rids = $('input[field="removeContactIds"]').val();
    var eids = $('input[field="removeEmails"]').val();
    if ($('div#' + id).hasClass('selected')) {
        $('div#' + id).removeClass('selected');
        // separate contact lists for managing existing movie night audiences
        if ($('div#' + id).hasClass('unregistered')) {
            $('input[field="removeEmails"]').val(eids.replace(name + ',', ''));
        } else if ($('div#' + id).hasClass('audience')) {
            $('input[field="removeContactIds"]').val(rids.replace(id + ',', ''));
        } else {
            $('input[field="contactIds"]').val(cids.replace(id + ',', ''));
        }
    } else {
        // prompt before uninviting audience contact
        if ($('div#' + id).hasClass('audience')) {
            if (confirm('Do you want to uninvite ' + name + '?')) {
                $('div#' + id).addClass('selected');
                if ($('div#' + id).hasClass('unregistered')) {
                    $('input[field="removeEmails"]').val(eids + name + ',');
                } else {
                    $('input[field="removeContactIds"]').val(rids + id + ',');
                }
            }
        } else {
            $('div#' + id).addClass('selected');
            $('input[field="contactIds"]').val(cids + id + ',');
        }
    }
}

// shift countdown text
$(document).ready(function() {
    var cd = $('div.cdText:first').text().split(' ');
    $('div.cdNumber').text(cd.shift());
    $('div.cdText').text(cd.join(' '));
})