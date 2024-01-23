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

        // Skapa en ny rad för varje kurs och lägg till i tabellen
        data.forEach(item => {
            const row = document.createElement("tr");

            // Skapa celler för kurskod, kursnamn och kursprogression
            const kursKodCell = document.createElement("td");
            kursKodCell.textContent = item.code;
            row.appendChild(kursKodCell);

            const kursNamnCell = document.createElement("td");
            kursNamnCell.textContent = item.coursename;
            row.appendChild(kursNamnCell);

            const kursProgressionCell = document.createElement("td");
            kursProgressionCell.textContent = item.progression;
            row.appendChild(kursProgressionCell);

            // Lägg till raden i tabellens tbody
            document.getElementById("table-body").appendChild(row);
        });

        console.table(data);

    } catch (error) {
        console.error(error);
    }
}

loadCourses();



