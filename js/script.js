// ==========================================
// STIC 2026 - CONFERENCE REGISTRATION
// ==========================================


// ==========================================
// 1. SHOW / HIDE WORKSHOP AND DAYS
// ==========================================

function showWorkshop() {

    const workshopSection =
        document.getElementById("workshopSection");

    const daysSection =
        document.getElementById("daysSection");

    const category =
        document.querySelector('input[name="category"]:checked');


    // If no category is selected
    if (!category) {

        daysSection.style.display = "none";
        workshopSection.style.display = "none";

        return;
    }


    // Show number of conference days
    daysSection.style.display = "block";


    // Show workshop only for Workshop Participant
    if (category.value === "Workshop Participant") {

        workshopSection.style.display = "block";

    } else {

        workshopSection.style.display = "none";


        // Clear selected workshop
        const workshops =
            document.querySelectorAll(
                'input[name="workshop"]'
            );

        workshops.forEach(function(workshop) {
            workshop.checked = false;
        });
    }


    calculateFee();
}


// ==========================================
// 2. CALCULATE FEE
// ==========================================

function calculateFee() {

    // Conference registration fee
    const registrationFee = 1000;


    // Number of conference days
    const days =
        parseInt(
            document.getElementById("days").value
        ) || 0;


    // Attendance = KSh 500 per day
    const attendanceFee =
        days * 500;


    // ======================================
    // WORKSHOP FEE
    // ======================================

    let workshopFee = 0;

    const selectedWorkshop =
        document.querySelector(
            'input[name="workshop"]:checked'
        );


    if (selectedWorkshop) {

        // Web Development workshop
        if (
            selectedWorkshop.value ===
            "Web Development"
        ) {

            workshopFee = 750;
        }


        // Artificial Intelligence workshop
        else if (
            selectedWorkshop.value ===
            "Artificial Intelligence"
        ) {

            workshopFee = 1000;
        }
    }


    // ======================================
    // MEAL FEE
    // ======================================

    let mealFee = 0;

    const lunch =
        document.getElementById("lunch");


    if (lunch.checked) {

        mealFee =
            days * 300;
    }


    // ======================================
    // TOTAL FEE
    // ======================================

    const total =
        registrationFee +
        attendanceFee +
        workshopFee +
        mealFee;


    // Display attendance fee
    document.getElementById(
        "attendanceFee"
    ).textContent =
        "KSh " +
        attendanceFee.toLocaleString();


    // Display workshop fee
    document.getElementById(
        "workshopFee"
    ).textContent =
        "KSh " +
        workshopFee.toLocaleString();


    // Display meal fee
    document.getElementById(
        "mealFee"
    ).textContent =
        "KSh " +
        mealFee.toLocaleString();


    // Display total
    document.getElementById(
        "totalFee"
    ).textContent =
        "KSh " +
        total.toLocaleString();


    // Store total for PHP
    document.getElementById(
        "total"
    ).value = total;
}


// ==========================================
// 3. FORM VALIDATION
// ==========================================

function validateForm() {

    // This array stores ALL errors
    // instead of showing them one at a time.
    let errors = [];


    // ======================================
    // GET FORM VALUES
    // ======================================

    const fullName =
        document.getElementById(
            "fullName"
        ).value.trim();


    const admissionNumber =
        document.getElementById(
            "admissionNumber"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const year =
        document.getElementById(
            "year"
        ).value;


    const days =
        document.getElementById(
            "days"
        ).value;


    const category =
        document.querySelector(
            'input[name="category"]:checked'
        );


    const workshop =
        document.querySelector(
            'input[name="workshop"]:checked'
        );


    // ======================================
    // CHECK FULL NAME
    // ======================================

    if (fullName === "") {

        errors.push(
            "• Full name is required."
        );
    }


    // ======================================
    // CHECK ADMISSION NUMBER
    // ======================================

    if (admissionNumber === "") {

        errors.push(
            "• Admission / Registration Number is required."
        );
    }


    // ======================================
    // CHECK EMAIL
    // ======================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        errors.push(
            "• Email address is required."
        );

    } else if (!emailPattern.test(email)) {

        errors.push(
            "• Please enter a valid email address."
        );
    }


    // ======================================
    // CHECK PHONE NUMBER
    // ======================================

    const phonePattern =
        /^\d{10}$/;


    if (phone === "") {

        errors.push(
            "• Phone number is required."
        );

    } else if (!phonePattern.test(phone)) {

        errors.push(
            "• Phone number must contain exactly 10 digits."
        );
    }


    // ======================================
    // CHECK YEAR OF STUDY
    // ======================================

    if (year === "") {

        errors.push(
            "• Please select your year of study."
        );
    }


    // ======================================
    // CHECK PARTICIPATION CATEGORY
    // ======================================

    if (!category) {

        errors.push(
            "• Please select a participation category."
        );
    }


    // ======================================
    // CHECK NUMBER OF DAYS
    // ======================================

    const numberOfDays =
        parseInt(days);


    if (
        isNaN(numberOfDays) ||
        numberOfDays < 1 ||
        numberOfDays > 3
    ) {

        errors.push(
            "• Please select between 1 and 3 conference days."
        );
    }


    // ======================================
    // CHECK WORKSHOP
    // ======================================

    if (
        category &&
        category.value ===
        "Workshop Participant"
    ) {

        if (!workshop) {

            errors.push(
                "• Please select a workshop."
            );
        }
    }


    // ======================================
    // SHOW ALL ERRORS AT ONCE
    // ======================================

    if (errors.length > 0) {

        alert(
            "Please correct the following:\n\n" +
            errors.join("\n")
        );

        return false;
    }


    // ======================================
    // ALL INFORMATION IS CORRECT
    // ======================================

    return true;
}


// ==========================================
// 4. CONNECT EVERYTHING AFTER PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // ======================================
        // CATEGORY CHANGE
        // ======================================

        const categories =
            document.querySelectorAll(
                'input[name="category"]'
            );


        categories.forEach(
            function(category) {

                category.addEventListener(
                    "change",
                    showWorkshop
                );

            }
        );


        // ======================================
        // DAYS CHANGE
        // ======================================

        document.getElementById(
            "days"
        ).addEventListener(
            "change",
            calculateFee
        );


        // ======================================
        // WORKSHOP CHANGE
        // ======================================

        const workshops =
            document.querySelectorAll(
                'input[name="workshop"]'
            );


        workshops.forEach(
            function(workshop) {

                workshop.addEventListener(
                    "change",
                    calculateFee
                );

            }
        );


        // ======================================
        // LUNCH CHANGE
        // ======================================

        document.getElementById(
            "lunch"
        ).addEventListener(
            "change",
            calculateFee
        );


        // ======================================
        // SUBMIT REGISTRATION
        // ======================================

        const form =
            document.getElementById(
                "registrationForm"
            );


        form.addEventListener(
            "submit",
            function(event) {

                // Stop normal submission temporarily
                event.preventDefault();


                // Validate the entire form
                const valid =
                    validateForm();


                // If there are errors,
                // stay on the registration page
                if (!valid) {

                    return;
                }


                // Recalculate final fee
                calculateFee();


                // All information is correct.
                // Submit the form to process.php
                form.submit();

            }
        );


        // ======================================
        // INITIAL PAGE SETUP
        // ======================================

        showWorkshop();

        calculateFee();

    }
);