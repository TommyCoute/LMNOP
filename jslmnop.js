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
    var cd = $('div.cdText:eq(0)').text().split(' ');
    $('div.cdNumber:eq(0)').text(cd.shift());
    $('div.cdText:eq(0)').text(cd.join(' '));
    var cd = $('div.cdText:eq(1)').text().split(' ');
    $('div.cdNumber:eq(1)').text(cd.shift());
    $('div.cdText:eq(1)').text(cd.join(' '));
});

// toggle suggested movie selection
function toggleSelection(id) {
    $('div#' + id).toggle(200);
}

// refreshment removal
function selectRefreshment(ritem) {
    removeRefreshment(ritem);
}