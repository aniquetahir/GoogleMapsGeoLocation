"use strict";
var page = require('webpage').create(),
    system = require('system'),
    address;
// var fs = require('fs');
//
// var faculty_affiliations_file = fs.open('../affiliation-location.csv', 'r');
// var affiliations = [];
// while(!faculty_affiliations_file.atEnd()){
//     var line = faculty_affiliations_file.readLine();
//     var name = line.split(',')[0];
//     affiliations.push(name);
// }
// faculty_affiliations_file.close();
page.captureContent = [];

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0';
page.onResourceRequested = function (req) {
    console.log('requested: ' + req.url);
    page.captureContent.push(req.url);
};
page.onResourceReceived = function (res) {
    if(typeof res.url != 'undefined' && res.url.indexOf('suggest=p')!=-1){
        //console.log('received: ' + JSON.stringify(res, undefined, 4));
        console.log(JSON.stringify(res.body));
    }
};

var getLocationCoordinates = function(locations){
    if(locations.length == 0){
        phantom.exit();
    }
    var location = locations.pop();
    getLocationCoordinates(locations);
};

page.onResourceError = function(resourceError) {
    console.error(resourceError.url + ': ' + resourceError.errorString);
};

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};


page.open('https://www.google.com/maps/', function(status){
    console.log(status);

    if (status !== 'success') {
        console.log("Failed to open google maps!");
        phantom.exit();
    }else{
        console.log("Successfully opened google maps. Trying keywords");
        // page.evaluate(function(){
        //     var inputbox = document.ge
        // });
        page.render("home.png");

        setTimeout(function(){
            page.render("home.png");
            sendWord("Arizona State University");
            setTimeout(function(){
                //
                page.render("home-clicked.png");
                phantom.exit();
            }, 3000);
        }, 3000);

        //getLocationCoordinates(["Arizona State University", "UCLA"]);
    }
});

var sendWord = function(word){
    page.evaluate(function(word){
        var box = document.getElementById("searchboxinput");
        box.value = word;
    }, word);

    page.sendEvent('keypress', page.event.key.Underscore, null, null, 0x02000000 | 0x08000000);
};

// if (system.args.length === 1) {
//     console.log('Usage: netlog.js <some URL>');
//     phantom.exit(1);
// } else {
//     address = system.args[1];
//
//     page.onResourceRequested = function (req) {
//         console.log('requested: ' + JSON.stringify(req, undefined, 4));
//     };
//
//     page.onResourceReceived = function (res) {
//         console.log('received: ' + JSON.stringify(res, undefined, 4));
//     };
//
//     page.open(address, function (status) {
//         if (status !== 'success') {
//             console.log('FAIL to load the address');
//         }
//         phantom.exit();
//     });
// }