/* --------------------------------- */
/* ZENE                              */
/* --------------------------------- */

const music = document.getElementById("weddingMusic");

const musicButton = document.getElementById("musicButton");

const volumeControl = document.getElementById("volumeControl");

const audioControls = document.getElementById("audioControls");


let isPlaying = false;



/* Korábban beállított hangerő betöltése */

const savedVolume =
    localStorage.getItem("weddingVolume");


if (savedVolume !== null) {

    music.volume = Number(savedVolume);

    volumeControl.value = savedVolume;

} else {

    music.volume = 0.35;

    volumeControl.value = 0.35;

}



/* Zene be / ki */

musicButton.addEventListener("click", async () => {

    if (!isPlaying) {

        try {

            await music.play();

            isPlaying = true;

            musicButton.classList.add("playing");

            audioControls.classList.add("active");

            musicButton.textContent = "♫";

            musicButton.setAttribute(
                "aria-label",
                "Zene leállítása"
            );


        } catch (error) {

            console.error(
                "A zene nem indítható:",
                error
            );

        }

    } else {

        music.pause();

        isPlaying = false;

        musicButton.classList.remove("playing");

        audioControls.classList.remove("active");

        musicButton.textContent = "♪";

        musicButton.setAttribute(
            "aria-label",
            "Zene lejátszása"
        );

    }

});



/* Hangerő */

volumeControl.addEventListener("input", () => {

    const volume =
        Number(volumeControl.value);

    music.volume = volume;


    localStorage.setItem(
        "weddingVolume",
        volume
    );

});



/* --------------------------------- */
/* NYELVVÁLTÁS                       */
/* --------------------------------- */

const saveTheDateImage =
    document.getElementById("saveTheDateImage");

const huButton =
    document.getElementById("huButton");

const viButton =
    document.getElementById("viButton");

const comingSoon =
    document.getElementById("comingSoon");



function setLanguage(language) {

    if (language === "vi") {

        /* Vietnámi Save the Date */

        saveTheDateImage.src =
            "images/save-the-date-vn.jpg";


        saveTheDateImage.alt =
            "Save the Date – 21 tháng 5 năm 2027";


        /* Vietnámi szöveg */

        comingSoon.textContent =
            "Thông tin chi tiết sẽ sớm được cập nhật ♡";


        /* Aktív gomb */

        viButton.classList.add("active");

        huButton.classList.remove("active");


        /* HTML nyelv */

        document.documentElement.lang = "vi";


        /* Gomb accessibility */

        if (isPlaying) {

            musicButton.setAttribute(
                "aria-label",
                "Tắt nhạc"
            );

        } else {

            musicButton.setAttribute(
                "aria-label",
                "Phát nhạc"
            );

        }


        volumeControl.setAttribute(
            "aria-label",
            "Âm lượng"
        );

    } else {

        /* Magyar Save the Date */

        saveTheDateImage.src =
            "images/save-the-date-hu.jpg";


        saveTheDateImage.alt =
            "Save the Date – 2027. május 21.";


        /* Magyar szöveg */

        comingSoon.textContent =
            "A részletekkel hamarosan jelentkezünk ♡";


        /* Aktív gomb */

        huButton.classList.add("active");

        viButton.classList.remove("active");


        /* HTML nyelv */

        document.documentElement.lang = "hu";


        /* Gomb accessibility */

        if (isPlaying) {

            musicButton.setAttribute(
                "aria-label",
                "Zene leállítása"
            );

        } else {

            musicButton.setAttribute(
                "aria-label",
                "Zene lejátszása"
            );

        }


        volumeControl.setAttribute(
            "aria-label",
            "Hangerő"
        );

    }


    /* Nyelv mentése */

    localStorage.setItem(
        "weddingLanguage",
        language
    );

}



/* HU */

huButton.addEventListener("click", () => {

    setLanguage("hu");

});



/* VI */

viButton.addEventListener("click", () => {

    setLanguage("vi");

});



/* Korábbi nyelv betöltése */

const savedLanguage =
    localStorage.getItem("weddingLanguage");


setLanguage(
    savedLanguage === "vi"
        ? "vi"
        : "hu"
);



/* --------------------------------- */
/* RÓZSASZIRMOK                      */
/* --------------------------------- */

const petalContainer =
    document.getElementById("petals");



function createPetal() {

    const petal =
        document.createElement("span");


    petal.classList.add("petal");



    /* Véletlenszerű méret */

    const size =
        7 + Math.random() * 7;


    petal.style.width =
        `${size}px`;

    petal.style.height =
        `${size * 1.45}px`;



    /* Véletlenszerű vízszintes pozíció */

    petal.style.left =
        `${Math.random() * 100}%`;



    /* Véletlenszerű esési sebesség */

    const duration =
        8 + Math.random() * 6;


    petal.style.animationDuration =
        `${duration}s`;



    /* Burgundy árnyalatok */

    const burgundyColors = [

        "#6f1d2e",

        "#7a2638",

        "#5f1828",

        "#812a40",

        "#751f35"

    ];


    petal.style.backgroundColor =
        burgundyColors[
            Math.floor(
                Math.random() *
                burgundyColors.length
            )
        ];



    /* Véletlenszerű átlátszóság */

    petal.style.opacity =
        0.35 + Math.random() * 0.35;



    /* Hozzáadás */

    petalContainer.appendChild(petal);



    /* Animáció után eltávolítjuk */

    setTimeout(() => {

        petal.remove();

    }, duration * 1000);

}



/* Ritkán jelenjen meg új szirom */

setInterval(() => {

    if (Math.random() > 0.35) {

        createPetal();

    }

}, 1200);

/* --------------------------------- */
/* VARÁZSPÁLCA / CSILLÁM TRAIL       */
/* --------------------------------- */

const sparkleColors = [
    "#f4d58d",   // világos arany
    "#e8c46a",   // arany
    "#fff7dc",   // törtfehér
    "#ffffff",   // fehér
    "#8a2942",   // burgundy
    "#6f1d2e"    // sötét burgundy
];


let lastSparkleTime = 0;


function createSparkle(x, y) {

    const sparkle =
        document.createElement("span");


    sparkle.classList.add("sparkle");


    /* Néha csillag alak */

    if (Math.random() > 0.45) {
        sparkle.classList.add("star");
    }


    /* Véletlenszerű méret */

    const size =
        3 + Math.random() * 6;


    sparkle.style.width =
        `${size}px`;

    sparkle.style.height =
        `${size}px`;


    /* Pozíció */

    const randomX =
        (Math.random() - 0.5) * 18;

    const randomY =
        (Math.random() - 0.5) * 18;


    sparkle.style.left =
        `${x + randomX}px`;

    sparkle.style.top =
        `${y + randomY}px`;


    /* Véletlenszerű szín */

const sparkleColor =
    sparkleColors[
        Math.floor(
            Math.random() *
            sparkleColors.length
        )
    ];

sparkle.style.backgroundColor =
    sparkleColor;

sparkle.style.color =
    sparkleColor;

    /* Fénylés */

    sparkle.style.boxShadow =
        `0 0 ${4 + Math.random() * 7}px currentColor`;


    /* Véletlenszerű mozgás */

    sparkle.style.setProperty(
        "--move-x",
        `${(Math.random() - 0.5) * 35}px`
    );


    sparkle.style.setProperty(
        "--move-y",
        `${10 + Math.random() * 30}px`
    );


    document.body.appendChild(sparkle);


    setTimeout(() => {

        sparkle.remove();

    }, 700);

}



/* Egér + telefon */

window.addEventListener(
    "pointermove",
    (event) => {

        /*
        Egér esetén mindig működik.
        Telefonon csak akkor, amikor
        az ujj ténylegesen a kijelzőn van.
        */

        if (
            event.pointerType === "touch" &&
            event.pressure === 0
        ) {
            return;
        }


        const now = performance.now();


        /*
        Ne gyártsunk túl sok részecskét.
        Kb. 30–35 ms-onként generálunk.
        */

        if (
            now - lastSparkleTime < 35
        ) {
            return;
        }


        lastSparkleTime = now;


        /*
        Egyszerre 2 apró csillám.
        */

        createSparkle(
            event.clientX,
            event.clientY
        );

        if (Math.random() > 0.4) {

            createSparkle(
                event.clientX,
                event.clientY
            );

        }

    },
    {
        passive: true
    }
);