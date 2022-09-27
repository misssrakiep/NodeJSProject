const fs = require(`fs`);
const prompt = require('prompt-sync')();

  
const fileToRead = prompt("Please enter file path: ");

//read data from file and assign to avariable
var data = fs.readFileSync(fileToRead, 'utf8');

//loop through the data and separate into two arrays
data = data.split(`\r\n`);

var females = [];
var males = [];
var sentencesToProcess = [];


for (let i in data) {
    data[i] = data[i].split(`, `);
   if (data[i][1] == `f`) {
       //check that data entry doesn't already exist
       if (!females.includes(data[i][0])) {
           females.push(data[i][0]);
       }
   } else {
       if (!males.includes(data[i][0]))
       males.push(data[i][0]);
   }
}

//match each single entry to every entry in other array

var originalsentences = loopAndAdd(females, males);
loopAndCalc(sentencesToProcess, originalsentences);

function loopAndAdd(f, m) {
    var sentences = [];
    let sentence = ``;
 for (let i=0; i<f.length; i++){
     for (let j=0; j<m.length; j++){
         sentence = f[i] + ` matches ` + m[j];
         sentencesToProcess.push(sentence.toLowerCase());
         sentences.push(sentence);
    }
}

    return sentences;
    // createString(sentences);
}

function loopAndCalc(match, sentences) {
    var data = []
    for (let i=0; i<match.length; i++) {
        data.push(match[i].replace(/\s+/g, ''));
    }
    matchChars(data, sentences);
}

function matchChars(sentence, sentences) {
var str = sentence;
var char, count;
var matched = [];

for (let i=0; i<str.length; i++) {
    var counts = {};
    for (let j=0; j<str[i].length; j++) {
        char = str[i].toString().charAt([j]);
        count = counts[char];
        counts[char] = count ? count + 1 : 1;  
    }
    matched.push(counts);
}
    var arr = [];

    matched.forEach(item => {
        arr.push(Object.values(item))
    });

    
    for (let j=0; j<arr.length; j++) {
        var percentage = addFirstAndLast(arr[j]);
        var concatedString = createString(sentences[j], percentage);

        fs.appendFile("output.txt", concatedString + "\n", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        
    }
}

function addFirstAndLast(chars) {
    var newArr = chars;
    var arrVals = [];

    while (newArr.length > 2) {
        newArr = loop(newArr);
    }

    let percentage = parseInt(newArr.join(''));

    return percentage;
}


function loop(newArr) {
    var arr = [];
    while (newArr.length !== 0) {
        let first = parseInt(newArr.shift());
        let last = parseInt(newArr.pop());
        var sum;

        if (!isNaN(last)) {
            sum = first + last;
        } else {
            sum = first;
        }

        arr = arr.concat(sum.toString().split(''));
    }
    return arr;
}


function createString(sentence, percentage) {
    return sentence + " " + percentage.toString() + "%"; 
}
