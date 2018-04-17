const request = require("request");
const url = 'https://www.asx.com.au/asx/research/ASXListedCompanies.csv';
var final = ""
function foo(url, callback){
    request.get(url, function (err, response, body) {
        return callback(body);
    });
  }
  
foo('https://www.asx.com.au/asx/research/ASXListedCompanies.csv', 
function(body){
    var dict = {};
    vals = final.split('\n')

    for (var i = 0; i < vals.length; i++) {
        // Iterate over numeric indexes from 0 to 5, as everyone expects.
        line = vals[i]
        words = line.split(',')

        if (words.length > 2) {

            //create the new company stuff here

            dict[words[0]] = (words[1],words[2])
        }

    }


    final =  dict
});