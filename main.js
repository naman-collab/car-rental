/* ===========================================================
   MASTER JS FILE — main.js
   Includes:
   ✔ Navbar login detection
   ✔ Hero slider
   ✔ Car filters
   ✔ Popup details
   ✔ Booking (local + whatsapp)
   ✔ Login + Signup + Popup signup
   ✔ Admin add/delete cars
   ✔ Payment page logic
   ✔ Payment-success GSAP animations
=========================================================== */


/* ===========================================================
   1) NAVBAR LOGIN USER SHOW
=========================================================== */
if (localStorage.getItem("userName")) {
    let name = localStorage.getItem("userName");
    let nav = document.querySelector("nav ul");

    if (nav) {
        nav.innerHTML += `<li><a style="color:gold;">Hi, ${name}</a></li>`;
    }
}


/* ===========================================================
   2) HERO SLIDER (index.html)
=========================================================== */
let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

function showSlide(i) {
    if (!slides.length) return;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");

    slideIndex = i;
}

function nextSlide() {
    if (!slides.length) return;
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function prevSlide() {
    if (!slides.length) return;
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

function goToSlide(i) {
    showSlide(i);
}

setInterval(nextSlide, 5000);


/* ===========================================================
   3) CAR FILTER SYSTEM (index.html)
=========================================================== */
function filterCars() {
    let type = document.getElementById("carFilter").value;
    let boxes = document.querySelectorAll(".car-box");

    boxes.forEach(box => {
        if (type === "all" || box.dataset.type === type) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}


/* ===========================================================
   4) CAR POPUP DETAILS (index.html)
=========================================================== */
function showDetails(text) {
    let p = document.getElementById("detailsPopup");
    document.getElementById("detailsText").innerText = text;
    p.style.display = "flex";
}

function closeDetails() {
    document.getElementById("detailsPopup").style.display = "none";
}


/* ===========================================================
   5) BOOKING FORM (booking.html)
=========================================================== */
function sendBooking() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let car = document.getElementById("car").value;

    if (!name || !phone || !date) {
        alert("Please fill all fields!");
        return;
    }

    // WhatsApp
    let msg = `New Booking:%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ACar: ${car}`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`);

    // Local save
    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({ name, phone, date, car });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    document.getElementById("successMessage").style.display = "block";
}


/* ===========================================================
   6) LOGIN + SIGNUP (login.html)
=========================================================== */

// LOGIN
function loginUser() {
    let email = document.getElementById("loginEmail")?.value;
    let pass = document.getElementById("loginPass")?.value;

    if (!email || !pass) return alert("Enter details!");

    if (email == "admin@gmail.com" && pass == "1234") {
        alert("Admin Logged In");
        window.location = "admin.html";
        return;
    }

    let uEmail = localStorage.getItem("userEmail");
    let uPass = localStorage.getItem("userPass");

    if (email == uEmail && pass == uPass) {
        alert("Login Successful!");
        window.location = "index.html";
    } else {
        alert("Invalid Credentials!");
    }
}


// SIGNUP (inside login page)
function createAccount() {
    let name = document.getElementById("sName").value;
    let email = document.getElementById("sEmail").value;
    let pass = document.getElementById("sPass").value;
    let pass2 = document.getElementById("sPass2").value;

    if (!name || !email || !pass) return alert("Fill all fields!");
    if (pass !== pass2) return alert("Passwords don't match!");

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPass", pass);

    alert("Account Created!");
    window.location = "login.html";
}


// POPUP SIGNUP
function openSignupPopup() {
    document.getElementById("signupPopup").style.display = "flex";
}

function closeSignupPopup() {
    document.getElementById("signupPopup").style.display = "none";
}

function popupSignup() {
    let n = document.getElementById("pName").value;
    let e = document.getElementById("pEmail").value;
    let p = document.getElementById("pPass").value;

    if (!n || !e || !p) return alert("Fill all fields!");

    localStorage.setItem("userName", n);
    localStorage.setItem("userEmail", e);
    localStorage.setItem("userPass", p);

    document.getElementById("popupSuccess").style.display = "block";
}


/* ===========================================================
   7) ADMIN PANEL (admin.html)
=========================================================== */
function loadCarsAdmin() {
    let cars = JSON.parse(localStorage.getItem("cars") || "[]");
    let box = document.getElementById("carList");
    if (!box) return;

    box.innerHTML = "";

    cars.forEach((car, i) => {
        box.innerHTML += `
            <div class="car-item">
                <div>
                    <h3 style="color:gold">${car.name}</h3>
                    <p>₹${car.price}/day</p>
                </div>
                <img src="${car.image}">
                <button onclick="deleteCar(${i})">Delete</button>
            </div>
        `;
    });
}
loadCarsAdmin();


function addCar() {
    let name = document.getElementById("carName").value;
    let price = document.getElementById("carPrice").value;
    let image = document.getElementById("carImage").value;

    if (!name || !price || !image) return alert("Fill all fields!");

    let cars = JSON.parse(localStorage.getItem("cars") || "[]");
    cars.push({ name, price, image });
    localStorage.setItem("cars", JSON.stringify(cars));

    alert("Car Added!");
    loadCarsAdmin();
}

function deleteCar(i) {
    let cars = JSON.parse(localStorage.getItem("cars") || "[]");
    cars.splice(i, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    loadCarsAdmin();
}


/* ===========================================================
   8) PAYMENT PAGE LOGIC (payment.html)
=========================================================== */
function showCard() {
    document.getElementById("cardForm").style.display = "block";
    document.getElementById("upiBox").style.display = "none";
}

function showUPI() {
    document.getElementById("upiBox").style.display = "block";
    document.getElementById("cardForm").style.display = "none";
}

function copyUPI() {
    navigator.clipboard.writeText("yourupi@bank");
    alert("UPI ID Copied!");
}

function paySuccess() {
    window.location = "payment-success.html";
}


/* ===========================================================
   9) PAYMENT SUCCESS PAGE ANIMATIONS (payment-success.html)
=========================================================== */
function animateSuccessPage() {
    if (!document.getElementById("ring")) return;

    gsap.to("#ring", { opacity: 1, scale: 1.2, duration: 1.5 });
    gsap.to("#successText", { opacity: 1, duration: 1, delay: 0.5 });

    function drive(car, delay) {
        gsap.to(car, {
            opacity: 1,
            left: window.innerWidth,
            duration: 2,
            delay: delay,
            ease: "power2.inOut"
        });
    }

    drive("#car1", 1.3);
    drive("#car2", 2.8);
    drive("#car3", 4.3);
    drive("#car4", 5.8);
    drive("#car5", 7.3);
}

animateSuccessPage();
