// OLD
// function remoteMathService(cb) {
//     var one, two;

//     callOneService(function(err, num) {
//         one = num;
//     });

//     callTwoService(function(err, num) {
//         two = num;
//     });

//     return cb(undefined, one + two);
// }

// function callOneService(cb) {
//     setTimeout(function() {
//         return cb(undefined, 1);
//     }, 1000);
// }

// function callTwoService(cb) {
//     setTimeout(function() {
//         return cb(undefined, 2);
//     }, 1500);
// }

// remoteMathService(function(err, answer) {
//     if (err) console.log("error ", err);

//     if (answer !== 3) {
//         console.log("wrong answer", answer);
//     } else {
//         console.log("correct");
//     }
// });

// NEW
// remoteMathService = synchronous function: "running in order"
function remoteMathService(cb) {
    var one, two;

    callOneService(function(err, num) {
        one = num;
    });

    callTwoService(function(err, num) {
        two = num;
    });

    // Need to wrap in setTimeout to make sure return executes AFTER callOneService & callTwoService
    setTimeout(function() {
        return cb(undefined, one + two);
    }, 2000); // Wait 2 sec. which will result in 'Correct' INSTEAD OF returning RIGHT AWAY which would result in "wrong answer" - NAN (undefined + undefined)
}

// callOneService = asynchronous function: "running in no particular order"
function callOneService(cb) {
    setTimeout(function() {
        return cb(undefined, 1);
    }, 1000); // Wait 1 sec.
}

// callTwoService = asynchronous function: "running in no particular order"
function callTwoService(cb) {
    setTimeout(function() {
        return cb(undefined, 2);
    }, 1500); // Wait 1.5 sec.
}

remoteMathService(function(err, answer) {
    if (err) console.log("error ", err);

    if (answer !== 3) {
        console.log("wrong answer", answer);
    } else {
        console.log("correct");
    }
});
