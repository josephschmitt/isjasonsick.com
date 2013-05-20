var calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var sickDay = new Date('Mar 24 2013 09:00:00 GMT-0400 (EDT)');
var count = 0;
var daysSince = 0;
var dayUpdateInterval;

var dayUpdateCheckInterval = setInterval(dateCheck, 3600000);
dateCheck();

function dateCheck() {
    daysSince = Math.floor((new Date() - sickDay)/(1000*60*60*24));
    dayUpdateCheck();
    $('#last-sick').html(calendarMonths[sickDay.getMonth()] + ' ' + sickDay.getDate() + ', ' + sickDay.getFullYear());
}

function dayUpdateCheck() {
    dayUpdateInterval = setInterval(doDayUpdate, 1000);
}

function doDayUpdate() {
    console.log('doDayUpdate', 'count', count, 'daysSince', daysSince);
    if (count < daysSince) {
        count++;
        setValue(count);
    }
    else {
        clearInterval(dayUpdateInterval);
    }
}

function setValue(val) {
    val = String(val);
    var ones = val.substr(val.length-1, 1);
    var tens = val.length > 1 ? val.substr(0, 1) : null;

    $('body').removeClass('play');

    var tensEls = $('ul.minutePlay li');
    var tensEl = tensEls.filter('.active');
    var curTen = parseInt(tensEl.find('.up .inn').text());

    if (tens && tens != curTen) {
        tensEl.addClass('before').removeClass('active');
        tensEls.eq(parseInt(tens))
            .addClass('active')
            .closest('body')
            .addClass('play');
    }


    var onesEls = $('ul.secondPlay li');
    var onesEl = onesEls.filter('.active');
    var curOne = parseInt(onesEl.find('.up .inn').text());
    
    if (ones != curOne) {
        if(onesEl.is(':last-child')) {
            onesEls.removeClass('before');
        }
        onesEl.addClass('before').removeClass('active');
        onesEls.eq(parseInt(ones))
            .addClass('active')
            .closest('body')
            .addClass('play');
    }
}