/* ================================================= */
/* EGYSZERŰ ESKÜVŐI JELSZÓ                          */
/* ================================================= */

/*
FONTOS:

Ez egy statikus GitHub Pages oldal.

Ez a jelszó az átlagos vendég számára belépési
kaput biztosít, de nem valódi szerveroldali
biztonsági védelem.
*/

const WEDDING_PASSWORD = "888";

/* ================================================= */
/* ELEMEK                                            */
/* ================================================= */

const loginScreen =
    document.getElementById(
        "loginScreen"
    );

const weddingSite =
    document.getElementById(
        "weddingSite"
    );

const loginForm =
    document.getElementById(
        "loginForm"
    );

const passwordInput =
    document.getElementById(
        "passwordInput"
    );

const loginTitle =
    document.getElementById(
        "loginTitle"
    );

const loginDescription =
    document.getElementById(
        "loginDescription"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const loginError =
    document.getElementById(
        "loginError"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const huButton =
    document.getElementById(
        "huButton"
    );

const viButton =
    document.getElementById(
        "viButton"
    );


const saveTheDateImage =
    document.getElementById(
        "saveTheDateImage"
    );

const comingSoon =
    document.getElementById(
        "comingSoon"
    );


const music =
    document.getElementById(
        "weddingMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const volumeControl =
    document.getElementById(
        "volumeControl"
    );

const audioControls =
    document.getElementById(
        "audioControls"
    );


const petalContainer =
    document.getElementById(
        "petals"
    );



/* ================================================= */
/* BEJELENTKEZÉS                                     */
/* ================================================= */

function showWeddingSite() {

    loginScreen.hidden =
        true;

    weddingSite.hidden =
        false;


    passwordInput.value =
        "";

    loginError.hidden =
        true;

}


function showLoginScreen() {

    weddingSite.hidden =
        true;

    loginScreen.hidden =
        false;


    stopMusic();


    passwordInput.value =
        "";

    loginError.hidden =
        true;


    window.setTimeout(
        () => {

            passwordInput.focus();

        },
        100
    );

}



/* ================================================= */
/* KORÁBBI BELÉPÉS ELLENŐRZÉSE                      */
/* ================================================= */

const alreadyAuthenticated =
    localStorage.getItem(
        "weddingAuthenticated"
    );


if (
    alreadyAuthenticated === "true"
) {

    showWeddingSite();

} else {

    showLoginScreen();

}



/* ================================================= */
/* LOGIN FORM                                        */
/* ================================================= */

loginForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const enteredPassword =
            passwordInput.value.trim();


        if (
            enteredPassword ===
            WEDDING_PASSWORD
        ) {

            localStorage.setItem(
                "weddingAuthenticated",
                "true"
            );


            showWeddingSite();


        } else {

            loginError.hidden =
                false;


            passwordInput.value =
                "";


            passwordInput.focus();

        }

    }
);



/* ================================================= */
/* KILÉPÉS                                           */
/* ================================================= */

logoutButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "weddingAuthenticated"
        );


        showLoginScreen();

    }
);



/* ================================================= */
/* NYELVVÁLTÁS                                       */
/* ================================================= */

function setLanguage(
    language
) {

    if (
        language === "vi"
    ) {

        document.documentElement.lang =
            "vi";


        loginTitle.textContent =
            "Chào mừng";


        loginDescription.textContent =
            "Vui lòng nhập mật khẩu có trong thiệp mời";


        passwordInput.placeholder =
            "Mật khẩu";


        loginButton.textContent =
            "Đăng nhập";


        loginError.textContent =
            "Mật khẩu không đúng ♡";


        saveTheDateImage.src =
            "images/save-the-date-vn.jpg";


        saveTheDateImage.alt =
            "Save the Date – 21 tháng 5 năm 2027";


        comingSoon.textContent =
            "Thông tin chi tiết sẽ sớm được cập nhật ♡";


        logoutButton.textContent =
            "Thoát";


        volumeControl.setAttribute(
            "aria-label",
            "Âm lượng"
        );


        viButton.classList.add(
            "active"
        );


        huButton.classList.remove(
            "active"
        );


    } else {

        document.documentElement.lang =
            "hu";


        loginTitle.textContent =
            "Üdvözlünk";


        loginDescription.textContent =
            "Kérjük, add meg a meghívóban található jelszót";


        passwordInput.placeholder =
            "Jelszó";


        loginButton.textContent =
            "Belépés";


        loginError.textContent =
            "Hibás jelszó ♡";


        saveTheDateImage.src =
            "images/save-the-date-hu.jpg";


        saveTheDateImage.alt =
            "Save the Date – 2027. május 21.";


        comingSoon.textContent =
            "A részletekkel hamarosan jelentkezünk ♡";


        logoutButton.textContent =
            "Kilépés";


        volumeControl.setAttribute(
            "aria-label",
            "Hangerő"
        );


        huButton.classList.add(
            "active"
        );


        viButton.classList.remove(
            "active"
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
/* MENTETT NYELV                                     */
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
/* HANGERŐ                                           */
/* ================================================= */

const savedVolume =
    localStorage.getItem(
        "weddingVolume"
    );


if (
    savedVolume !== null
) {

    const parsedVolume =
        Number(
            savedVolume
        );


    if (
        Number.isFinite(
            parsedVolume
        )
        &&
        parsedVolume >= 0
        &&
        parsedVolume <= 1
    ) {

        music.volume =
            parsedVolume;


        volumeControl.value =
            String(
                parsedVolume
            );


    } else {

        music.volume =
            0.35;


        volumeControl.value =
            "0.35";

    }


} else {

    music.volume =
        0.35;


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
        )
        ||
        "hu";


    const isPlaying =
        !music.paused
        &&
        !music.ended;


    if (
        isPlaying
    ) {

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


    } catch (
        error
    ) {

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

    if (
        !music.paused
    ) {

        music.pause();

    }


    updateAudioUI();

}



/* ================================================= */
/* ZENE GOMB                                         */
/* ================================================= */

musicButton.addEventListener(
    "click",
    async () => {

        if (
            music.paused
        ) {

            await startMusic();


        } else {

            stopMusic();

        }

    }
);



/* ================================================= */
/* HANGERŐ ÁLLÍTÁS                                   */
/* ================================================= */

volumeControl.addEventListener(
    "input",
    () => {

        const volume =
            Number(
                volumeControl.value
            );


        if (
            !Number.isFinite(
                volume
            )
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
/* AUDIO ESEMÉNYEK                                   */
/* ================================================= */

music.addEventListener(
    "play",
    updateAudioUI
);


music.addEventListener(
    "pause",
    updateAudioUI
);


music.addEventListener(
    "ended",
    updateAudioUI
);



/* ================================================= */
/* APP / TAB VÁLTÁSKOR ZENE STOP                    */
/* ================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            stopMusic();

        }

    }
);


window.addEventListener(
    "pagehide",
    stopMusic
);



/* ================================================= */
/* CSÖKKENTETT MOZGÁS                                */
/* ================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );



/* ================================================= */
/* RÓZSASZIRMOK                                      */
/* ================================================= */

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


    if (
        weddingSite.hidden
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


    const size =
        7
        +
        Math.random()
        *
        7;


    petal.style.width =
        `${size}px`;


    petal.style.height =
        `${size * 1.45}px`;


    petal.style.left =
        `${
            Math.random()
            *
            100
        }%`;


    const duration =
        8
        +
        Math.random()
        *
        6;


    petal.style.animationDuration =
        `${duration}s`;


    petal.style.backgroundColor =
        burgundyColors[
            Math.floor(
                Math.random()
                *
                burgundyColors.length
            )
        ];


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


    window.setTimeout(
        () => {

            petal.remove();

        },
        duration * 1000
    );

}



window.setInterval(
    () => {

        if (
            Math.random()
            >
            0.65
        ) {

            createPetal();

        }

    },
    1600
);



/* ================================================= */
/* CSILLÁMSZÓRÓ                                      */
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


let lastSparkleTime =
    0;


let touchIsActive =
    false;



function createSparkle(
    x,
    y
) {

    if (
        reducedMotion.matches
    ) {

        return;

    }


    if (
        weddingSite.hidden
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


    if (
        Math.random()
        >
        0.65
    ) {

        sparkle.classList.add(
            "star"
        );

    }


    const size =
        3
        +
        Math.random()
        *
        6;


    sparkle.style.width =
        `${size}px`;


    sparkle.style.height =
        `${size}px`;


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


    sparkle.style.boxShadow =
        `0 0 ${
            4
            +
            Math.random()
            *
            7
        }px currentColor`;


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
            Math.random()
            *
            30
        }px`
    );


    document.body.appendChild(
        sparkle
    );


    window.setTimeout(
        () => {

            sparkle.remove();

        },
        700
    );

}



/* ================================================= */
/* TOUCH                                             */
/* ================================================= */

window.addEventListener(
    "pointerdown",
    (event) => {

        if (
            event.pointerType
            ===
            "touch"
        ) {

            touchIsActive =
                true;

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
            event.pointerType
            ===
            "touch"
        ) {

            touchIsActive =
                false;

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
            event.pointerType
            ===
            "touch"
        ) {

            touchIsActive =
                false;

        }

    },
    {
        passive: true
    }
);



/* ================================================= */
/* EGÉR + TOUCH CSILLÁM                              */
/* ================================================= */

window.addEventListener(
    "pointermove",
    (event) => {

        if (
            reducedMotion.matches
        ) {

            return;

        }


        if (
            weddingSite.hidden
        ) {

            return;

        }


        if (
            event.pointerType
            ===
            "touch"
            &&
            !touchIsActive
        ) {

            return;

        }


        const now =
            performance.now();


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


        createSparkle(
            event.clientX,
            event.clientY
        );


        if (
            Math.random()
            >
            0.65
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
/* KEZDŐ AUDIO UI                                    */
/* ================================================= */

updateAudioUI();