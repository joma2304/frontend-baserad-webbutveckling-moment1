"use strict"

// Hämta in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

//eventlyssnare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Toggla fram navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    //hämtar in css för menyn
    let style = window.getComputedStyle(navMenuEl);

    //koll om navigering är synlig eller ej, ändrar display block/none
    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

//startar funktion vid inladdning av sida
onload = startTime();

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

//Tabell med kurser

async function loadCourses() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        const data = await response.json();

        //Filtrera kurskod
        const kursKod = data.filter(item => item.code);
        //Filtrera kursnamn
        const kursNamn = data.filter(item => item.coursename);
        //Filtrera kursprogression
        const kursProgression = data.filter(item => item.progression);

        //Loopa och skriv ut kurskod
        kursKod.forEach((item) => {
            //Skapar ett nytt element
            const kurskodElement = document.createElement("tr");

            // Lägg till kurskoden i det nya elementet
            kurskodElement.innerHTML = item.code;

            document.getElementById("kurskod").appendChild(kurskodElement);
        });

        //Loopa och skriv ut kursnamn
        kursNamn.forEach((item) => {
            //Skapar ett nytt element
            const kursNamnElement = document.createElement("tr");

            // Lägg till kurskoden i det nya elementet
            kursNamnElement.innerHTML = item.coursename;

            document.getElementById("kursnamn").appendChild(kursNamnElement);
        });

        //Loopa och skriv ut kursprogression
        kursProgression.forEach((item) => {
            //Skapar ett nytt element
            const kursProgressionElement = document.createElement("tr");

            // Lägg till kurskoden i det nya elementet
            kursProgressionElement.innerHTML = item.progression;

            document.getElementById("kursprogression").appendChild(kursProgressionElement);
        });

        console.table(kursKod, kursNamn, kursProgression);

    } catch (error) {
        console.error(error);
    }
}

loadCourses();


