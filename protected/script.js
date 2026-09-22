/* --------------------------------- */
/* ZENE                              */
/* --------------------------------- */

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const volumeControl =
    document.getElementById("volumeControl");

const audioControls =
    document.getElementById("audioControls");


let isPlaying = false;



/* --------------------------------- */
/* HANGERŐ BETÖLTÉSE                 */
/* --------------------------------- */

const savedVolume =
    localStorage.getItem("weddingVolume");


if (savedVolume !== null) {

    music.volume =
        Number(savedVolume);

    volumeControl.value =
        savedVolume;

} else {

    music.volume = 0.35;

    volumeControl.value = 0.35;
}



/* --------------------------------- */
/* AUDIO UI FRISSÍTÉSE               */
/* --------------------------------- */

function updateAudioUI() {

    const currentLanguage =
        localStorage.getItem("weddingLanguage") || "hu";


    if (isPlaying) {

        musicButton.classList.add("playing");

        audioControls.classList.add("active");

        musicButton.textContent = "♫";


        if (currentLanguage === "vi") {

            musicButton.setAttribute(
                "aria-label",
                "Tắt nhạc"
            );

        } else {

            musicButton.setAttribute(
                "aria-label",
                "Zene leállítása"
            );

        }

    } else {

        musicButton.classList.remove("playing");

        audioControls.classList.remove("active");

        musicButton.textContent = "♪";


        if (currentLanguage === "vi") {

            musicButton.setAttribute(
                "aria-label",
                "Phát nhạc"
            );

        } else {

            musicButton.setAttribute(
                "aria-label",
                "Zene lejátszása"
            );

        }

    }
}



/* --------------------------------- */
/* ZENE INDÍTÁSA                     */
/* --------------------------------- */

async function startMusic() {

    try {

        await music.play();

        isPlaying = true;

        updateAudioUI();

    } catch (error) {

        console.error(
            "A zene nem indítható:",
            error
        );
    }
}



/* --------------------------------- */
/* ZENE LEÁLLÍTÁSA                   */
/* --------------------------------- */

function stopMusic() {

    if (!music.paused) {

        music.pause();
    }

    isPlaying = false;

    updateAudioUI();
}



/* --------------------------------- */
/* PLAY / PAUSE GOMB                 */
/* --------------------------------- */

musicButton.addEventListener(
    "click",
    async () => {

        if (music.paused) {

            await startMusic();

        } else {

            stopMusic();

        }

    }
);



/* --------------------------------- */
/* HANGERŐ                           */
/* --------------------------------- */

volumeControl.addEventListener(
    "input",
    () => {

        const volume =
            Number(volumeControl.value);


        music.volume =
            volume;


        localStorage.setItem(
            "weddingVolume",
            String(volume)
        );

    }
);



/* --------------------------------- */
/* APP / FÜL VÁLTÁSKOR STOP          */
/* --------------------------------- */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            stopMusic();
        }

    }
);


window.addEventListener(
    "pagehide",
    () => {

        stopMusic();

    }
);



/* --------------------------------- */
/* HA BÁRMIÉRT LEÁLL A ZENE          */
/* --------------------------------- */

music.addEventListener(
    "pause",
    () => {

        isPlaying = false;

        updateAudioUI();

    }
);

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

        saveTheDateImage.src =
            "asset.php?file=images/save-the-date-vn.jpg";


        saveTheDateImage.alt =
            "Save the Date – 21 tháng 5 năm 2027";


        comingSoon.textContent =
            "Thông tin chi tiết sẽ sớm được cập nhật ♡";


        viButton.classList.add("active");

        huButton.classList.remove("active");


        document.documentElement.lang =
            "vi";


    } else {


        saveTheDateImage.src =
            "asset.php?file=images/save-the-date-hu.jpg";


        saveTheDateImage.alt =
            "Save the Date – 2027. május 21.";


        comingSoon.textContent =
            "A részletekkel hamarosan jelentkezünk ♡";


        huButton.classList.add("active");

        viButton.classList.remove("active");


        document.documentElement.lang =
            "hu";

    }

    localStorage.setItem(
        "weddingLanguage",
        language
    );

    updateAudioUI();
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

    if (Math.random() > 0.65) {

        createPetal();

    }

}, 1600);

function stopMusic() {

    if (!isPlaying) {
        return;
    }


    music.pause();

    isPlaying = false;


    musicButton.classList.remove(
        "playing"
    );


    audioControls.classList.remove(
        "active"
    );


    musicButton.textContent = "♪";


    const currentLanguage =
        localStorage.getItem(
            "weddingLanguage"
        );


    if (currentLanguage === "vi") {

        musicButton.setAttribute(
            "aria-label",
            "Phát nhạc"
        );

    } else {

        musicButton.setAttribute(
            "aria-label",
            "Zene lejátszása"
        );

    }

}

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            stopMusic();

        }

    }
);

window.addEventListener(
    "pagehide",
    () => {

        stopMusic();

    }
);

// window.addEventListener(
//     "blur",
//     () => {

//         stopMusic();

//     }
// );

music.addEventListener(
    "pause",
    () => {

        isPlaying = false;

        musicButton.classList.remove(
            "playing"
        );

        audioControls.classList.remove(
            "active"
        );

        musicButton.textContent = "♪";

    }
);

/* --------------------------------- */
/* VARÁZSPÁLCA / CSILLÁM TRAIL       */
/* --------------------------------- */

const sparkleColors = [

    "#f4d58d",   // világos arany
    "#f4d58d",

    "#e8c46a",   // arany
    "#e8c46a",

    "#fff7dc",   // törtfehér

    "#ffffff",
    "#ffffff",

    "#8a2942",   // burgundy

    "#6f1d2e"    // sötét burgundy
];


let lastSparkleTime = 0;



function createSparkle(x, y) {

    const sparkle =
        document.createElement("span");


    sparkle.classList.add("sparkle");



    /*
    Néha csillag alakú,
    néha egyszerű fénypont
    */

    if (Math.random() > 0.65) {

        sparkle.classList.add("star");

    }



    /* Méret */

    const size =
        3 + Math.random() * 6;


    sparkle.style.width =
        `${size}px`;

    sparkle.style.height =
        `${size}px`;



    /* Kicsi random szórás az egér körül */

    const randomX =
        (Math.random() - 0.5) * 18;

    const randomY =
        (Math.random() - 0.5) * 18;


    sparkle.style.left =
        `${x + randomX}px`;

    sparkle.style.top =
        `${y + randomY}px`;



    /* Szín */

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



    /* Fényudvar */

    sparkle.style.boxShadow =
        `0 0 ${4 + Math.random() * 7}px currentColor`;



    /* Véletlenszerű szétszóródás */

    sparkle.style.setProperty(
        "--move-x",
        `${(Math.random() - 0.5) * 35}px`
    );


    sparkle.style.setProperty(
        "--move-y",
        `${10 + Math.random() * 30}px`
    );



    document.body.appendChild(
        sparkle
    );



    /* Animáció után töröljük */

    setTimeout(
        () => {

            sparkle.remove();

        },
        700
    );

}



/* --------------------------------- */
/* EGÉR + TOUCH                      */
/* --------------------------------- */

window.addEventListener(

    "pointermove",

    (event) => {

        const now =
            performance.now();



        /*
        Mobilon csak valódi érintés közben.
        */

        if (
            event.pointerType === "touch" &&
            event.pressure === 0
        ) {

            return;

        }



        /*
        Csillám sűrűsége.
        Nagyobb szám = ritkább.
        */

        if (
            now - lastSparkleTime < 45
        ) {

            return;

        }


        lastSparkleTime =
            now;



        /*
        Minimum egy csillám.
        */

        createSparkle(
            event.clientX,
            event.clientY
        );



        /*
        Néha egy második.
        */

        if (Math.random() > 0.65) {

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