<?php

// ==========================================
// STIC 2026 - PROCESS REGISTRATION
// ==========================================


// ==========================================
// 1. CHECK THAT THE FORM WAS SUBMITTED
// ==========================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo "<h2>Invalid Request</h2>";
    echo "<p>Please submit the registration form first.</p>";
    exit;
}


// ==========================================
// 2. RECEIVE FORM DATA
// ==========================================

$fullName =
    trim($_POST["fullName"] ?? "");

$admissionNumber =
    trim($_POST["admissionNumber"] ?? "");

$email =
    trim($_POST["email"] ?? "");

$phone =
    trim($_POST["phone"] ?? "");

$year =
    $_POST["year"] ?? "";

$category =
    $_POST["category"] ?? "";

$days =
    (int)($_POST["days"] ?? 0);

$workshop =
    $_POST["workshop"] ?? "";

$lunch =
    $_POST["lunch"] ?? "";


// ==========================================
// 3. SERVER-SIDE VALIDATION
// ==========================================

$errors = [];


// Full name
if ($fullName === "") {

    $errors[] = "Full name is required.";
}


// Admission number
if ($admissionNumber === "") {

    $errors[] =
        "Admission / Registration Number is required.";
}


// Email
if ($email === "") {

    $errors[] =
        "Email address is required.";

} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    $errors[] =
        "Please provide a valid email address.";
}


// Phone number
if (!preg_match("/^[0-9]{10}$/", $phone)) {

    $errors[] =
        "Phone number must contain exactly 10 digits.";
}


// Year
if ($year === "") {

    $errors[] =
        "Please select your year of study.";
}


// Category
if (
    $category !== "Conference Only" &&
    $category !== "Workshop Participant"
) {

    $errors[] =
        "Please select a valid participation category.";
}


// Days
if ($days < 1 || $days > 3) {

    $errors[] =
        "Conference days must be between 1 and 3.";
}


// Workshop
if ($category === "Workshop Participant") {

    if (
        $workshop !== "Web Development" &&
        $workshop !== "Artificial Intelligence"
    ) {

        $errors[] =
            "Please select a valid workshop.";
    }
}


// ==========================================
// 4. DISPLAY ERRORS IF ANY
// ==========================================

if (!empty($errors)) {

    echo "<h2>Registration Error</h2>";

    echo "<p>Please correct the following:</p>";

    echo "<ul>";

    foreach ($errors as $error) {

        echo "<li>" .
             htmlspecialchars($error) .
             "</li>";
    }

    echo "</ul>";

    echo '<p><a href="register.html">
            Return to Registration
          </a></p>';

    exit;
}


// ==========================================
// 5. CALCULATE FEES IN PHP
// ==========================================

// Conference registration
$registrationFee = 1000;


// Attendance
$attendanceFee = $days * 500;


// Workshop
$workshopFee = 0;

if ($category === "Workshop Participant") {

    if ($workshop === "Web Development") {

        $workshopFee = 750;

    } elseif ($workshop === "Artificial Intelligence") {

        $workshopFee = 1000;
    }
}


// Lunch
$mealFee = 0;

if ($lunch === "Yes") {

    $mealFee = $days * 300;
}


// ==========================================
// 6. CALCULATE FINAL TOTAL
// ==========================================

$totalFee =
    $registrationFee +
    $attendanceFee +
    $workshopFee +
    $mealFee;


// ==========================================
// 7. DISPLAY CONFIRMATION
// ==========================================

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Registration Confirmation</title>

    <link rel="stylesheet"
          href="css/style.css">

</head>


<body>


<header>

    <nav>

        <h2>STIC 2026</h2>

        <ul>

            <li>
                <a href="index.html">Home</a>
            </li>

            <li>
                <a href="register.html">Register</a>
            </li>

        </ul>

    </nav>

</header>


<main>

    <section class="registration">

        <h1>Registration Successful!</h1>


        <p>
            Thank you,
            <strong>
                <?php echo htmlspecialchars($fullName); ?>
            </strong>,
            for registering for the
            Student Technology and Innovation Conference.
        </p>


        <h2>Registration Details</h2>


        <p>
            <strong>Admission / Registration Number:</strong>
            <?php echo htmlspecialchars($admissionNumber); ?>
        </p>


        <p>
            <strong>Email:</strong>
            <?php echo htmlspecialchars($email); ?>
        </p>


        <p>
            <strong>Phone:</strong>
            <?php echo htmlspecialchars($phone); ?>
        </p>


        <p>
            <strong>Year of Study:</strong>
            <?php echo htmlspecialchars($year); ?>
        </p>


        <p>
            <strong>Participation Category:</strong>
            <?php echo htmlspecialchars($category); ?>
        </p>


        <p>
            <strong>Conference Days:</strong>
            <?php echo $days; ?>
        </p>


        <?php if ($category === "Workshop Participant") { ?>

            <p>
                <strong>Workshop:</strong>
                <?php echo htmlspecialchars($workshop); ?>
            </p>

        <?php } ?>


        <p>
            <strong>Lunch:</strong>

            <?php

            if ($lunch === "Yes") {

                echo "Yes";

            } else {

                echo "No";
            }

            ?>

        </p>


        <h2>Fee Summary</h2>


        <p>
            Conference Registration:
            <strong>
                KSh <?php echo number_format($registrationFee); ?>
            </strong>
        </p>


        <p>
            Attendance:
            <strong>
                KSh <?php echo number_format($attendanceFee); ?>
            </strong>
        </p>


        <p>
            Workshop:
            <strong>
                KSh <?php echo number_format($workshopFee); ?>
            </strong>
        </p>


        <p>
            Meals:
            <strong>
                KSh <?php echo number_format($mealFee); ?>
            </strong>
        </p>


        <hr>


        <h2>
            Total Fee:
            KSh <?php echo number_format($totalFee); ?>
        </h2>


        <br>


        <a href="register.html"
           class="register-button">
            Register Another Participant
        </a>

    </section>

</main>


<footer>

    <p>
        &copy; 2026 Student Technology and Innovation Conference
    </p>

</footer>


</body>

</html>