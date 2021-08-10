$(document).ready(function() {
    document.getElementById('submit').addEventListener('click', calculateBMI);
});


function calculateBMI(event) {
    event.preventDefault();

    const wUnit = document.getElementById('w-unit').options[document.getElementById('w-unit').selectedIndex].value;
    const hUnit = document.getElementById('h-unit').options[document.getElementById('h-unit').selectedIndex].value;

    let w = weightToKG(document.getElementById('weight').value, wUnit);
    let h = document.getElementById('height').value;

    if (w === undefined || (w > 625 || w < 27)) {
        alert('Weight was not entered or was invalid. Please try again!');
        return;
    }

    if (!h) {
        h = heightToM(parseInch(), 'inch');
    }
    else {
        h = heightToM(h, hUnit);
    }

    if (2.51 < h || h < 0.63) {
        alert('Height was not entered or was invalid. Please try again!');
        return;
    }

    const userValues = {
        weight: w,
        height: h,
    };

    const bmi = (userValues.weight / (userValues.height * userValues.height)).toFixed(1);
    let status = 'normal';

    if (bmi < 18.5) {
        status = 'underweight';
    }
    else if (bmi >= 25) {
        status = 'overweight';
    }

    if ($('#answer')) {
        $('#answer').remove();
    }

    $('#bmi-div').append(`<p id="answer">Your Body Mass Index is ${bmi}, which is considered <b>${status}</b>.</p>`);

}

function parseInch() {
    return document.getElementById('foot').options[document.getElementById('foot').selectedIndex].value * 12 + Number(document.getElementById('inches').options[document.getElementById('inches').selectedIndex].value);
}

function heightToM(h, unit) {
    return unit === 'inch' ? (h * 2.54) / 100: h / 100;
}

function weightToKG(w, unit) {
    return unit === 'lbs' ? (w / 2.205): w;
}