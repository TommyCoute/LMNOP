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

// update heading when creating/managing movie night theme
function updateHeading() {
    var mnTheme = $('input[field="theme"]').val();
    $('h1#lmnopHeading').text('New ' + mnTheme);
}

// set date/time using custom input fields
$(document).ready(function() {
    $('input[field="inputdate"]').datetimepicker();
    var dd = $('input[field="displaydate"]').val();
    if (dd != null) {
        $('input[field="inputdate"]').val(moment(dd).format('MM/DD/YYYY h:mm A'));
    }
    $('input[field="inputVDNumber"]').prop('type', 'number');
});

function fixDateTime() {
    var st = $('input[field="inputdate"]').val();
    if (st != "") {
        var stFixed = moment(st).format('YYYY-MM-DD HH:mm:ss');
        $('input[field="inputdate"]').val(stFixed);
    }
}

// validate unregistered audience email field
function validateUAEmail() {
    var invalidCount = 0
    var uaEmail = $('textarea[field="audienceEmail"]').val();
    var uaEmailArray = uaEmail.replace(/ /g, '').split(',');
    if (uaEmail != '') {
        for (var i = 0; i < uaEmailArray.length; i++) {
            if (/(.+)@(.+){2,}\.(.+){2,}/.test(uaEmailArray[i])) {
                // all good
            } else {
                invalidCount++;
            }
        }
    }
    if (invalidCount > 0) {
        $('span.audienceWarning').show();
    } else {
        $('span.audienceWarning').hide();
    }
}

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