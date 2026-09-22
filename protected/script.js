/* ================================================= */
/* ZENE                                              */
/* ================================================= */

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const volumeControl =
    document.getElementById("volumeControl");

const audioControls =
    document.getElementById("audioControls");



/* ================================================= */
/* HANGERŐ BETÖLTÉSE                                 */
/* ================================================= */

const savedVolume =
    localStorage.getItem(
        "weddingVolume"
    );


if (savedVolume !== null) {

    const parsedVolume =
        Number(savedVolume);


    if (
        Number.isFinite(parsedVolume)
        &&
        parsedVolume >= 0
        &&
        parsedVolume <= 1
    ) {

        music.volume =
            parsedVolume;

        volumeControl.value =
            String(parsedVolume);

    } else {

        music.volume = 0.35;

        volumeControl.value =
            "0.35";

    }

} else {

    music.volume = 0.35;

    volumeControl.value =
        "0.35";

}



/* ================================================= */
/* AUDIO UI                                          */
/* ================================================= */

function updateAudioUI() {

    const currentLanguage =
        localStorage.getItem(
            "weddingLanguage"
        ) || "hu";


    const isPlaying =
        !music.paused
        &&
        !music.ended;


    if (isPlaying) {

        musicButton.classList.add(
            "playing"
        );

        audioControls.classList.add(
            "active"
        );

        musicButton.textContent =
            "♫";


        if (
            currentLanguage === "vi"
        ) {

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

        musicButton.classList.remove(
            "playing"
        );

        audioControls.classList.remove(
            "active"
        );

        musicButton.textContent =
            "♪";


        if (
            currentLanguage === "vi"
        ) {

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



/* ================================================= */
/* ZENE INDÍTÁSA                                     */
/* ================================================= */

async function startMusic() {

    try {

        await music.play();

        updateAudioUI();

    } catch (error) {

        console.error(
            "A zene nem indítható:",
            error
        );

    }

}



/* ================================================= */
/* ZENE LEÁLLÍTÁSA                                   */
/* ================================================= */

function stopMusic() {

    if (!music.paused) {

        music.pause();

    }


    updateAudioUI();

}



/* ================================================= */
/* PLAY / PAUSE GOMB                                 */
/* ================================================= */

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



/* ================================================= */
/* HANGERŐ                                           */
/* ================================================= */

volumeControl.addEventListener(
    "input",
    () => {

        const volume =
            Number(
                volumeControl.value
            );


        if (
            !Number.isFinite(volume)
        ) {

            return;

        }


        music.volume =
            Math.min(
                1,
                Math.max(
                    0,
                    volume
                )
            );


        localStorage.setItem(
            "weddingVolume",
            String(
                music.volume
            )
        );

    }
);



/* ================================================= */
/* AUDIO ÁLLAPOT ESEMÉNYEK                           */
/* ================================================= */

music.addEventListener(
    "play",
    () => {

        updateAudioUI();

    }
);


music.addEventListener(
    "pause",
    () => {

        updateAudioUI();

    }
);


music.addEventListener(
    "ended",
    () => {

        updateAudioUI();

    }
);



/* ================================================= */
/* APP / BÖNGÉSZŐFÜL VÁLTÁSKOR ZENE STOP             */
/* ================================================= */

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



/* ================================================= */
/* NYELVVÁLTÁS                                       */
/* ================================================= */

const saveTheDateImage =
    document.getElementById(
        "saveTheDateImage"
    );

const huButton =
    document.getElementById(
        "huButton"
    );

const viButton =
    document.getElementById(
        "viButton"
    );

const comingSoon =
    document.getElementById(
        "comingSoon"
    );



function setLanguage(
    language
) {

    if (language === "vi") {

        saveTheDateImage.src =
            "asset.php?file=images/save-the-date-vn.jpg";


        saveTheDateImage.alt =
            "Save the Date – 21 tháng 5 năm 2027";


        comingSoon.textContent =
            "Thông tin chi tiết sẽ sớm được cập nhật ♡";


        viButton.classList.add(
            "active"
        );


        huButton.classList.remove(
            "active"
        );


        document.documentElement.lang =
            "vi";


        volumeControl.setAttribute(
            "aria-label",
            "Âm lượng"
        );

    } else {

        saveTheDateImage.src =
            "asset.php?file=images/save-the-date-hu.jpg";


        saveTheDateImage.alt =
            "Save the Date – 2027. május 21.";


        comingSoon.textContent =
            "A részletekkel hamarosan jelentkezünk ♡";


        huButton.classList.add(
            "active"
        );


        viButton.classList.remove(
            "active"
        );


        document.documentElement.lang =
            "hu";


        volumeControl.setAttribute(
            "aria-label",
            "Hangerő"
        );

    }


    localStorage.setItem(
        "weddingLanguage",
        language
    );


    updateAudioUI();

}



/* ================================================= */
/* NYELV GOMBOK                                      */
/* ================================================= */

huButton.addEventListener(
    "click",
    () => {

        setLanguage(
            "hu"
        );

    }
);


viButton.addEventListener(
    "click",
    () => {

        setLanguage(
            "vi"
        );

    }
);



/* ================================================= */
/* MENTETT NYELV BETÖLTÉSE                           */
/* ================================================= */

const savedLanguage =
    localStorage.getItem(
        "weddingLanguage"
    );


setLanguage(

    savedLanguage === "vi"
        ? "vi"
        : "hu"

);



/* ================================================= */
/* MOZGÁS CSÖKKENTÉSE                                */
/* ================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );



/* ================================================= */
/* RÓZSASZIRMOK                                      */
/* ================================================= */

const petalContainer =
    document.getElementById(
        "petals"
    );


const burgundyColors = [

    "#6f1d2e",

    "#7a2638",

    "#5f1828",

    "#812a40",

    "#751f35"

];



function createPetal() {

    if (
        reducedMotion.matches
    ) {

        return;

    }


    const petal =
        document.createElement(
            "span"
        );


    petal.classList.add(
        "petal"
    );



    /*
    Véletlenszerű méret
    */

    const size =
        7
        +
        Math.random() * 7;


    petal.style.width =
        `${size}px`;


    petal.style.height =
        `${size * 1.45}px`;



    /*
    Véletlenszerű indulási pont
    */

    petal.style.left =
        `${Math.random() * 100}%`;



    /*
    Véletlenszerű esési idő
    */

    const duration =
        8
        +
        Math.random() * 6;


    petal.style.animationDuration =
        `${duration}s`;



    /*
    Véletlenszerű burgundy árnyalat
    */

    petal.style.backgroundColor =
        burgundyColors[

            Math.floor(

                Math.random()
                *
                burgundyColors.length

            )

        ];



    /*
    Véletlenszerű áttetszőség
    */

    petal.style.opacity =
        String(
            0.35
            +
            Math.random()
            *
            0.35
        );



    petalContainer.appendChild(
        petal
    );



    /*
    Animáció után eltávolítás
    */

    window.setTimeout(
        () => {

            petal.remove();

        },
        duration * 1000
    );

}



/* ================================================= */
/* SZIRMOK IDŐZÍTÉSE                                 */
/* ================================================= */

window.setInterval(
    () => {

        if (
            reducedMotion.matches
        ) {

            return;

        }


        /*
        Kb. 35% esély
        minden 1,6 másodpercben.
        */

        if (
            Math.random() > 0.65
        ) {

            createPetal();

        }

    },
    1600
);



/* ================================================= */
/* VARÁZSPÁLCA / CSILLÁM TRAIL                       */
/* ================================================= */

const sparkleColors = [

    "#f4d58d",
    "#f4d58d",

    "#e8c46a",
    "#e8c46a",

    "#fff7dc",

    "#ffffff",
    "#ffffff",

    "#8a2942",

    "#6f1d2e"

];


let lastSparkleTime = 0;

let touchIsActive = false;



/* ================================================= */
/* CSILLÁM LÉTREHOZÁSA                               */
/* ================================================= */

function createSparkle(
    x,
    y
) {

    if (
        reducedMotion.matches
    ) {

        return;

    }


    const sparkle =
        document.createElement(
            "span"
        );


    sparkle.classList.add(
        "sparkle"
    );



    /*
    Néha csillag alakú,
    máskor egyszerű kis fénypont.
    */

    if (
        Math.random() > 0.65
    ) {

        sparkle.classList.add(
            "star"
        );

    }



    /*
    Véletlenszerű méret
    */

    const size =
        3
        +
        Math.random() * 6;


    sparkle.style.width =
        `${size}px`;


    sparkle.style.height =
        `${size}px`;



    /*
    Kicsi szórás a kurzor körül
    */

    const randomX =
        (
            Math.random()
            -
            0.5
        )
        *
        18;


    const randomY =
        (
            Math.random()
            -
            0.5
        )
        *
        18;


    sparkle.style.left =
        `${x + randomX}px`;


    sparkle.style.top =
        `${y + randomY}px`;



    /*
    Szín
    */

    const sparkleColor =
        sparkleColors[

            Math.floor(

                Math.random()
                *
                sparkleColors.length

            )

        ];


    sparkle.style.backgroundColor =
        sparkleColor;


    sparkle.style.color =
        sparkleColor;



    /*
    Fényudvar
    */

    sparkle.style.boxShadow =
        `0 0 ${
            4
            +
            Math.random() * 7
        }px currentColor`;



    /*
    Véletlenszerű szétszóródás
    */

    sparkle.style.setProperty(
        "--move-x",
        `${
            (
                Math.random()
                -
                0.5
            )
            *
            35
        }px`
    );


    sparkle.style.setProperty(
        "--move-y",
        `${
            10
            +
            Math.random() * 30
        }px`
    );



    document.body.appendChild(
        sparkle
    );



    /*
    Animáció után eltávolítás
    */

    window.setTimeout(
        () => {

            sparkle.remove();

        },
        700
    );

}



/* ================================================= */
/* TOUCH ÁLLAPOT                                     */
/* ================================================= */

window.addEventListener(
    "pointerdown",
    (event) => {

        if (
            event.pointerType === "touch"
        ) {

            touchIsActive = true;

        }

    },
    {
        passive: true
    }
);


window.addEventListener(
    "pointerup",
    (event) => {

        if (
            event.pointerType === "touch"
        ) {

            touchIsActive = false;

        }

    },
    {
        passive: true
    }
);


window.addEventListener(
    "pointercancel",
    (event) => {

        if (
            event.pointerType === "touch"
        ) {

            touchIsActive = false;

        }

    },
    {
        passive: true
    }
);



/* ================================================= */
/* EGÉR + ÉRINTÉS CSILLÁM                            */
/* ================================================= */

window.addEventListener(
    "pointermove",
    (event) => {

        if (
            reducedMotion.matches
        ) {

            return;

        }


        /*
        Telefonon csak akkor legyen
        csillám, ha az ujj ténylegesen
        hozzáér a kijelzőhöz.
        */

        if (
            event.pointerType === "touch"
            &&
            !touchIsActive
        ) {

            return;

        }


        const now =
            performance.now();



        /*
        Sűrűség:
        nagyobb szám = ritkább csillám.
        */

        if (
            now
            -
            lastSparkleTime
            <
            45
        ) {

            return;

        }


        lastSparkleTime =
            now;



        /*
        Legalább egy csillám
        */

        createSparkle(
            event.clientX,
            event.clientY
        );



        /*
        Néha egy második csillám
        */

        if (
            Math.random() > 0.65
        ) {

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



/* ================================================= */
/* KEZDETI AUDIO UI                                  */
/* ================================================= */

updateAudioUI();