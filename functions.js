console.log("JavaScript is connected!");

const toggleButton = document.getElementById('theme_button');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark_theme');
});

const goToTopButton = document.getElementById('go_to_top');

window.addEventListener('scroll', checkHeight);

function checkHeight() {
    if (window.scrollY > 200) {
        goToTopButton.style.display = 'block';
    } else {
        goToTopButton.style.display = 'none';
    }
}

goToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const sidebar = document.getElementById('sidebar');
const sidebarButton = document.getElementById('sidebar_button');

sidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarButton.classList.toggle('active');
    if (sidebarButton.classList.contains('active')) {
        sidebarButton.innerHTML = '<i class="bx bx-x"></i>';
    }
    else {
        sidebarButton.innerHTML = '<i class="bx bx-menu"></i>';
    }
});


let hrs = document.getElementById('hrs'); 
let min = document.getElementById('min'); 
let sec = document.getElementById('sec'); 

// setInterval(() => { 
//     let currentTime = new Date(); 
//     hrs.innerHTML = currentTime.getHours(); 
//     min.innerHTML = currentTime.getMinutes(); 
//     sec.innerHTML = currentTime.getSeconds(); 
// }, 1000); 

window.addEventListener("load", function () {
    loadSurveyResults();
});

let firstName = document.getElementById("first-name-id");
let lastName = document.getElementById("last-name-id");
let email = document.getElementById("email-id");
let phone = document.getElementById("phone-id");
let country = document.getElementById("country-id");
let city = document.getElementById("city-id");
let streetName = document.getElementById("street-id");
let streetNumber = document.getElementById("number-id");
let firstQ = document.getElementById("first-q");
let secondQ = document.getElementById("second-q");
let thirdQ = document.getElementById("third-q");
let fourthQ = document.getElementById("fourth-q");
let fifthQ = document.getElementById("fifth-q");
const resultsContainer = document.querySelector(".your-results");
let surveyResultsContainer = document.querySelector(".survey-results");

//localStorage.removeItem("surveyResults");







document.getElementById("submit-btn").addEventListener("click", function(event) {

    event.preventDefault();

    const form = document.querySelector("form");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    const phonePattern = /^[0-9+]/;
    if (!phonePattern.test(phone.value)) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const surveyData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        country: country.value,
        city: city.value,
        streetName: streetName.value,
        streetNumber: streetNumber.value,
        firstQ: Number(firstQ.value),
        secondQ: Number(secondQ.value),
        thirdQ: Number(thirdQ.value),
        fourthQ: Number(fourthQ.value),
        fifthQ: Number(fifthQ.value),
    };
    console.log(surveyData);

    resultsArr.push(surveyData);
    surveyResultsArr.push(surveyData);
    updateResults();
    updateSurveyResults();

    saveSurveyResults();
    form.reset();
});

document.getElementById("clear-btn").addEventListener("click", function () {
    const form = document.querySelector("form");
    form.reset();

    resultsContainer.innerHTML = "";

});

let resultsArr = [];
let surveyResultsArr = [];


function updateResults() {

    let results = "";

    resultsArr.forEach((result) => {
        results += `<div class="result">
        <p>Full Name: ${result.firstName} ${result.lastName}</p>
        <p>Email: ${result.email}</p>
        <p>Phone number: ${result.phone}</p>
        <p>Address: ${result.country}, ${result.city}, ${result.streetName} street, ${result.streetNumber}</p>
        <p>Question results: 1. ${result.firstQ}; 2. ${result.secondQ}; 
        3. ${result.thirdQ}; 4. ${result.fourthQ}; 5. ${result.fifthQ};</p>
        </div>`;
    });

    resultsContainer.innerHTML = results;
}

function calculateAvg(q1, q2, q3, q4, q5) {
    return ((q1 + q2 + q3 + q4 + q5) / 5).toFixed(2);;
}

function updateSurveyResults(){
    let surveyResults = "";

    surveyResultsArr.forEach((result) => {

        const avg = calculateAvg(result.firstQ, result.secondQ, result.thirdQ, 
            result.fourthQ, result.fifthQ);

            let avgColor = "";
            if (avg >= 0 && avg < 4) {
                avgColor = "red";
            } else if (avg >= 4 && avg < 7) {
                avgColor = "orange";
            } else if (avg >= 7 && avg <= 10) {
                avgColor = "green";
            }


        surveyResults += `<div class="surveyResult">
        <i class = "bx bx-chevron-right" id = "list_icon"></i>
        <p>${result.firstName} ${result.lastName} (${result.email}):
        <span style="color: ${avgColor};">${avg}</span>;</p>
        </div>`;
    }); 

    surveyResultsContainer.innerHTML = surveyResults;
}

function saveSurveyResults() {
    localStorage.setItem("surveyResults", JSON.stringify(surveyResultsArr));
}

function loadSurveyResults() {
    const storedResults = localStorage.getItem("surveyResults");
    if (storedResults === null) {
        return;
    }
    surveyResultsArr.push(...JSON.parse(storedResults));

    updateSurveyResults();
}



