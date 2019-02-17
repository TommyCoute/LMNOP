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

// set date/time using custom input fields
$(document).ready(function() {
    $('input[field="inputdate"]').prop('type', 'datetime-local');
    $('input[field="inputdate"]').val($('input[field="displaydate"]').val());
    $('input[field="inputVDNumber"]').prop('type', 'number');
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
    var cd = $('div.cdText:eq(0) span').text().split(' ');
    $('div.cdNumber:eq(0) span').text(cd.shift());
    $('div.cdText:eq(0) span').text(cd.join(' '));
    
    // start countdown timer less than a minute left
    var cdUnit = $('div.cdText:eq(0) span').text().split(' ').shift();
    if (cdUnit == 'second' || cdUnit == 'seconds') {
        var timeleft = $('div.cdNumber:eq(0) span').text() - 1;
        $('div.cdNumber:eq(0) span').css('opacity', '1');
        $('div.cdNumber:eq(0) span').animate({opacity: '0'}, 1000);
        var x = setInterval(function() {
            var distance = timeleft--;
            
            // refresh the page at 0
            if (distance == 0) {
                clearInterval(x);
                $('div.cdNumber:eq(0) span').text(distance);
                $('div.cdNumber:eq(0) span').finish();
                $('div.cdNumber:eq(0) span').css('opacity', '1');
                reloadNight();
            } else {
                $('div.cdNumber:eq(0) span').text(distance);
                $('div.cdNumber:eq(0) span').finish();
                $('div.cdNumber:eq(0) span').css('opacity', '1');
                $('div.cdNumber:eq(0) span').animate({opacity: '0'}, 1000);
            }
        }, 1000);
    }
    
    // update second copy (when refreshments is on the movienight page)
    var cd = $('div.cdText:eq(1) span').text().split(' ');
    $('div.cdNumber:eq(1) span').text(cd.shift());
    $('div.cdText:eq(1) span').text(cd.join(' '));
});

// toggle suggested movie selection
function toggleSelection(id) {
    if ($('div#' + id).css('display') == 'none') {
        $('div#' + id).show(200).css('display', 'inline-block');
    } else {
        $('div#' + id).hide(200);
    }
}

// refreshment removal
function selectRefreshment(ritem) {
    removeRefreshment(ritem);
}