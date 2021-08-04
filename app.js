const bDate = document.querySelector("#b-date");
const btnCheck = document.querySelector("#btn-check");
const loadingGif = document.querySelector("#loading-gif");
const cakeImg = document.querySelector("#cake-img");
const outputResult = document.querySelector(".output-result");

const noOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function resOutput(msg) {
    outputResult.innerHTML = msg;
}

btnCheck.addEventListener("click", () => {
    if (bDate.value === "") {
        outputResult.style.display = "inline-grid";
        cakeImg.style.display = "none";
        resOutput(`Please Enter a Date!!`);
    } else {
        outputResult.style.display = "none";
        loadingGif.style.display = "inline-flex";
        cakeImg.style.display = "none";
        setTimeout(() => {
            outputResult.style.display = "inline-grid";
            loadingGif.style.display = "none";
            bDateChecker(bDate.value);
        }, 6000);
    }
})


function bDateChecker(dob) {
    var dob2 = dob.split("-");
    var dobDate = dob2[2];
    var dobMonth = dob2[1];
    var dobYear = dob2[0];

    formatA = dobMonth + dobDate + dobYear;
    formatB = dobDate + dobMonth + dobYear;
    formatC = dobDate + dobMonth + dobYear.slice(2, 4);

    if (palindromeCheck(formatA)) {
        console.log("AAAAA");
        resOutput(`Congrats!, your birthdate: ${dobMonth}-${dobDate}-${dobYear} in MM-DD-YYYY format`);
    }
    if (palindromeCheck(formatB)) {
        console.log("BBBBB");
        resOutput(`Congrats!, your birthdate: ${dobDate}-${dobMonth}-${dobYear} in DD-MM-YYYY format`);
    }
    if (palindromeCheck(formatC)) {
        console.log("CCCCC");
        resOutput(`Congrats!, your birthdate: ${dobDate}-${dobMonth}-${dobYear.slice(2, 4)} in DD-MM-YY format`);
    } else {
        nearestPalCheck(dobDate, dobMonth, dobYear);
    }

    function palindromeCheck(format) {
        resOutput(``);
        var dobRev = format.split("").reverse().join("");
        if (format === dobRev) {
            return true;
        } else {
            return false;
        }
    }

    function nearestPalCheck(date, month, year) {
        var date1 = Number(date);
        var month1 = Number(month);
        var year1 = Number(year);
        var date2 = Number(date);
        var month2 = Number(month);
        var year2 = Number(year);
        console.log(date1, month1, date2, month2, year1, year2);


        for (var i = 1; i > 0; i++) {

            // upcoming next date
            date1 += 1;
            if (date1 > noOfDays[month1 - 1]) {
                month1 += 1;
                date1 = 01;
            }
            if (month1 > 12) {
                month1 = 1;
                year1 += 1;
            }
            var monStr = month1.toString();
            var dateStr = date1.toString();
            var yearStr = year1.toString();
            if (monStr.length == 1) {
                monStr = "0" + monStr;
            }
            if (dateStr.length == 1) {
                dateStr = "0" + dateStr;
            }
            if (palindromeCheck(dateStr + monStr + yearStr)) {
                resOutput(`Ooh, your birthdate is not a Palindrome, nearest palindrome date is ${dateStr}-${monStr}-${yearStr}, you missed it by ${i} days`);
                break;
            }

            // Passed date
            date2 -= 1;
            if (date2 < 1) {
                console.log("yoo");
                month2 -= 1;
                date2 = noOfDays[month2 - 1];
            }
            if (month2 < 1) {
                month2 = 12;
                year2 -= 1;
            }
            var monStr2 = month2.toString();
            var dateStr2 = date2.toString();
            var yearStr2 = year2.toString();
            if (monStr2.length == 1) {
                monStr2 = "0" + monStr2;
            }
            if (dateStr2.length == 1) {
                dateStr2 = "0" + dateStr2;
            }
            if (palindromeCheck(dateStr2 + monStr2 + yearStr2)) {
                resOutput(`Ooh, your birthdate is not a Palindrome, nearest palindrome date is ${dateStr2}-${monStr2}-${yearStr2}, you missed it by ${i} days`);
                break;
            }
        }
    }
}