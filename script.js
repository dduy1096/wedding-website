/* ================================================= */
/* ESKÜVŐI OLDAL                                     */
/* ================================================= */

function initWeddingWebsite() {


    /* ============================================= */
    /* JELSZÓ                                        */
    /* ============================================= */

    const WEDDING_PASSWORD =
        "888";



    /* ============================================= */
    /* LOGIN ELEMEK                                  */
    /* ============================================= */

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



    /* ============================================= */
    /* NYELVI ELEMEK                                 */
    /* ============================================= */

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

    const venueEyebrow =
        document.getElementById(
            "venueEyebrow"
        );

    const venueTitle =
        document.getElementById(
            "venueTitle"
        );

    const mapsLink =
        document.getElementById(
            "mapsLink"
        );

    const swipeHint =
        document.getElementById(
            "swipeHint"
        );



    /* ============================================= */
    /* SLIDER ELEMEK                                 */
    /* ============================================= */

    const slidesViewport =
        document.getElementById(
            "slidesViewport"
        );

    const slidesTrack =
        document.getElementById(
            "slidesTrack"
        );

    const slides =
        Array.from(
            document.querySelectorAll(
                ".wedding-slide"
            )
        );

    const slidePetalContainers =
        Array.from(
            document.querySelectorAll(
                ".slide-petals"
            )
        );

    const prevSlideButton =
        document.getElementById(
            "prevSlideButton"
        );

    const nextSlideButton =
        document.getElementById(
            "nextSlideButton"
        );

    const slideDots =
        Array.from(
            document.querySelectorAll(
                ".slide-dot"
            )
        );



    /* ============================================= */
    /* AUDIO                                         */
    /* ============================================= */

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



    /* ============================================= */
    /* MOZGÁS                                        */
    /* ============================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );



    /* ============================================= */
    /* ÁLLAPOT                                       */
    /* ============================================= */

    let loginSubmitting =
        false;

    let currentSlide =
        0;

    let pointerDown =
        false;

    let pointerStartX =
        0;

    let pointerCurrentX =
        0;

    let sliderWidth =
        0;

    let lastSparkleTime =
        0;

    let touchIsActive =
        false;



    /* ============================================= */
    /* LOGIN                                         */
    /* ============================================= */

    function clearLoginError() {

        if (loginError) {

            loginError.hidden =
                true;

        }

    }


    function resetLoginForm() {

        loginSubmitting =
            false;


        if (passwordInput) {

            passwordInput.value =
                "";

            passwordInput.disabled =
                false;

        }


        if (loginButton) {

            loginButton.disabled =
                false;

        }


        clearLoginError();

    }


    function showLoginError() {

        if (loginError) {

            loginError.hidden =
                false;

        }


        if (passwordInput) {

            passwordInput.value =
                "";

            passwordInput.disabled =
                false;

        }


        if (loginButton) {

            loginButton.disabled =
                false;

        }


        loginSubmitting =
            false;


        requestAnimationFrame(
            () => {

                if (passwordInput) {

                    passwordInput.focus();

                }

            }
        );

    }



    /* ============================================= */
    /* SLIDER                                        */
    /* ============================================= */

    function updateSliderWidth() {

        if (!slidesViewport) {
            return;
        }


        sliderWidth =
            slidesViewport.clientWidth;

    }



    function resetPetalParallax() {

        slidePetalContainers.forEach(
            (
                container
            ) => {

                container.classList.remove(
                    "dragging"
                );


                container.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );

    }



    function applyPetalParallax(
        deltaX
    ) {

        const parallaxAmount =
            -deltaX * 0.12;


        slidePetalContainers.forEach(
            (
                container
            ) => {

                container.classList.add(
                    "dragging"
                );


                container.style.transform =
                    `translate3d(${parallaxAmount}px, 0, 0)`;

            }
        );

    }



    function applySlidePosition(
        animated = true
    ) {

        if (!slidesTrack) {
            return;
        }


        if (animated) {

            slidesTrack.classList.remove(
                "dragging"
            );


        } else {

            slidesTrack.classList.add(
                "dragging"
            );

        }


        const offset =
            currentSlide * 100;


        slidesTrack.style.transform =
            `translate3d(-${offset}%, 0, 0)`;


        resetPetalParallax();

    }



    function updateSliderUI() {

        slideDots.forEach(
            (
                dot,
                index
            ) => {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );

            }
        );


        if (prevSlideButton) {

            prevSlideButton.disabled =
                currentSlide === 0;

        }


        if (nextSlideButton) {

            nextSlideButton.disabled =
                currentSlide ===
                slides.length - 1;

        }


        if (
            swipeHint
            &&
            currentSlide !== 0
        ) {

            swipeHint.classList.add(
                "hidden"
            );

        }

    }



    function goToSlide(
        index
    ) {

        const maxIndex =
            slides.length - 1;


        currentSlide =
            Math.min(
                maxIndex,
                Math.max(
                    0,
                    index
                )
            );


        applySlidePosition(
            true
        );


        updateSliderUI();

    }



    function nextSlide() {

        goToSlide(
            currentSlide + 1
        );

    }



    function previousSlide() {

        goToSlide(
            currentSlide - 1
        );

    }



    /* ============================================= */
    /* AUDIO                                         */
    /* ============================================= */

    function updateAudioUI() {

        if (
            !music
            ||
            !musicButton
            ||
            !audioControls
        ) {

            return;

        }


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


        musicButton.classList.toggle(
            "playing",
            isPlaying
        );


        audioControls.classList.toggle(
            "active",
            isPlaying
        );


        musicButton.textContent =
            isPlaying
                ? "♫"
                : "♪";


        musicButton.setAttribute(

            "aria-label",

            currentLanguage === "vi"

                ? (
                    isPlaying
                        ? "Tắt nhạc"
                        : "Phát nhạc"
                )

                : (
                    isPlaying
                        ? "Zene leállítása"
                        : "Zene lejátszása"
                )

        );


        if (volumeControl) {

            volumeControl.setAttribute(

                "aria-label",

                currentLanguage === "vi"
                    ? "Âm lượng"
                    : "Hangerő"

            );

        }

    }



    async function startMusic() {

        if (!music) {
            return;
        }


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



    function stopMusic() {

        if (!music) {
            return;
        }


        if (!music.paused) {

            music.pause();

        }


        updateAudioUI();

    }



    /* ============================================= */
    /* OLDALAK                                       */
    /* ============================================= */

    function showLoginScreen() {

        if (weddingSite) {

            weddingSite.hidden =
                true;

        }


        if (loginScreen) {

            loginScreen.hidden =
                false;

        }


        stopMusic();


        goToSlide(
            0
        );


        resetLoginForm();


        setTimeout(
            () => {

                if (passwordInput) {

                    passwordInput.focus();

                }

            },
            100
        );

    }



    function showWeddingSite() {

        if (loginScreen) {

            loginScreen.hidden =
                true;

        }


        if (weddingSite) {

            weddingSite.hidden =
                false;

        }


        resetLoginForm();


        requestAnimationFrame(
            () => {

                updateSliderWidth();

                applySlidePosition(
                    true
                );

            }
        );

    }



    /* ============================================= */
    /* NYELV                                         */
    /* ============================================= */

    function setLanguage(
        language
    ) {

        if (
            language === "vi"
        ) {

            document.documentElement.lang =
                "vi";


            if (loginTitle) {
                loginTitle.textContent =
                    "Chào mừng";
            }


            if (loginDescription) {
                loginDescription.textContent =
                    "Vui lòng nhập mật khẩu có trong thiệp mời";
            }


            if (passwordInput) {
                passwordInput.placeholder =
                    "Mật khẩu";
            }


            if (loginButton) {
                loginButton.textContent =
                    "Đăng nhập";
            }


            if (loginError) {
                loginError.textContent =
                    "Mật khẩu không đúng ♡";
            }


            if (saveTheDateImage) {

                saveTheDateImage.src =
                    "images/save-the-date-vn.jpg";

                saveTheDateImage.alt =
                    "Save the Date – 21 tháng 5 năm 2027";

            }


            if (comingSoon) {
                comingSoon.textContent =
                    "Thông tin chi tiết sẽ sớm được cập nhật ♡";
            }


            if (venueEyebrow) {
                venueEyebrow.textContent =
                    "Địa điểm";
            }


            if (venueTitle) {
                venueTitle.textContent =
                    "Dudok Rendezvényház";
            }


            if (mapsLink) {
                mapsLink.textContent =
                    "Mở trong Google Maps";
            }


            if (swipeHint) {
                swipeHint.textContent =
                    "Vuốt sang ngang ♡";
            }


            if (logoutButton) {
                logoutButton.textContent =
                    "Thoát";
            }


            if (huButton) {
                huButton.classList.remove(
                    "active"
                );
            }


            if (viButton) {
                viButton.classList.add(
                    "active"
                );
            }


        } else {

            document.documentElement.lang =
                "hu";


            if (loginTitle) {
                loginTitle.textContent =
                    "Üdvözlünk";
            }


            if (loginDescription) {
                loginDescription.textContent =
                    "Kérjük, add meg a meghívóban található jelszót";
            }


            if (passwordInput) {
                passwordInput.placeholder =
                    "Jelszó";
            }


            if (loginButton) {
                loginButton.textContent =
                    "Belépés";
            }


            if (loginError) {
                loginError.textContent =
                    "Hibás jelszó ♡";
            }


            if (saveTheDateImage) {

                saveTheDateImage.src =
                    "images/save-the-date-hu.jpg";

                saveTheDateImage.alt =
                    "Save the Date – 2027. május 21.";

            }


            if (comingSoon) {
                comingSoon.textContent =
                    "A részletekkel hamarosan jelentkezünk ♡";
            }


            if (venueEyebrow) {
                venueEyebrow.textContent =
                    "Helyszín";
            }


            if (venueTitle) {
                venueTitle.textContent =
                    "Dudok Rendezvényház";
            }


            if (mapsLink) {
                mapsLink.textContent =
                    "Megnyitás Google Maps-ben";
            }


            if (swipeHint) {
                swipeHint.textContent =
                    "Húzd oldalra ♡";
            }


            if (logoutButton) {
                logoutButton.textContent =
                    "Kilépés";
            }


            if (huButton) {
                huButton.classList.add(
                    "active"
                );
            }


            if (viButton) {
                viButton.classList.remove(
                    "active"
                );
            }

        }


        localStorage.setItem(
            "weddingLanguage",
            language
        );


        updateAudioUI();

    }



    /* ============================================= */
    /* LOGIN SUBMIT                                  */
    /* ============================================= */

    if (
        loginForm
        &&
        passwordInput
    ) {

        loginForm.addEventListener(
            "submit",
            (
                event
            ) => {

                event.preventDefault();


                if (loginSubmitting) {
                    return;
                }


                clearLoginError();


                const enteredPassword =
                    passwordInput.value.trim();


                if (
                    enteredPassword === ""
                ) {

                    passwordInput.focus();

                    return;

                }


                loginSubmitting =
                    true;


                if (loginButton) {

                    loginButton.disabled =
                        true;

                }


                if (
                    enteredPassword ===
                    WEDDING_PASSWORD
                ) {

                    localStorage.setItem(
                        "weddingAuthenticated",
                        "true"
                    );


                    setTimeout(
                        showWeddingSite,
                        40
                    );


                } else {

                    setTimeout(
                        showLoginError,
                        120
                    );

                }

            }
        );


        passwordInput.addEventListener(
            "input",
            clearLoginError
        );


        passwordInput.addEventListener(
            "paste",
            clearLoginError
        );

    }



    /* ============================================= */
    /* LOGOUT                                        */
    /* ============================================= */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "weddingAuthenticated"
                );


                showLoginScreen();

            }
        );

    }



    /* ============================================= */
    /* SLIDER GOMBOK                                 */
    /* ============================================= */

    if (prevSlideButton) {

        prevSlideButton.addEventListener(
            "click",
            previousSlide
        );

    }


    if (nextSlideButton) {

        nextSlideButton.addEventListener(
            "click",
            nextSlide
        );

    }



    slideDots.forEach(
        (
            dot
        ) => {

            dot.addEventListener(
                "click",
                () => {

                    const target =
                        Number(
                            dot.dataset.slideTarget
                        );


                    if (
                        Number.isInteger(
                            target
                        )
                    ) {

                        goToSlide(
                            target
                        );

                    }

                }
            );

        }
    );



    /* ============================================= */
    /* SWIPE / DRAG                                  */
    /* ============================================= */

    if (slidesViewport) {

        slidesViewport.addEventListener(
            "pointerdown",
            (
                event
            ) => {

                /*
                Google Maps maradjon használható.
                */

                if (
                    event.target.closest(
                        "iframe"
                    )
                ) {

                    return;

                }


                pointerDown =
                    true;


                pointerStartX =
                    event.clientX;


                pointerCurrentX =
                    event.clientX;


                updateSliderWidth();


                slidesViewport.classList.add(
                    "dragging"
                );


                if (slidesTrack) {

                    slidesTrack.classList.add(
                        "dragging"
                    );

                }


                slidePetalContainers.forEach(
                    (
                        container
                    ) => {

                        container.classList.add(
                            "dragging"
                        );

                    }
                );


                slidesViewport.setPointerCapture(
                    event.pointerId
                );

            }
        );



        slidesViewport.addEventListener(
            "pointermove",
            (
                event
            ) => {

                if (!pointerDown) {
                    return;
                }


                pointerCurrentX =
                    event.clientX;


                const deltaX =
                    pointerCurrentX -
                    pointerStartX;


                const baseOffset =
                    currentSlide *
                    sliderWidth;


                let targetOffset =
                    baseOffset -
                    deltaX;



                /* SZÉLSŐ GUMIHATÁS */

                if (
                    currentSlide === 0
                    &&
                    deltaX > 0
                ) {

                    targetOffset =
                        baseOffset -
                        deltaX * 0.25;

                }


                if (
                    currentSlide ===
                    slides.length - 1
                    &&
                    deltaX < 0
                ) {

                    targetOffset =
                        baseOffset -
                        deltaX * 0.25;

                }


                if (
                    slidesTrack
                    &&
                    sliderWidth > 0
                ) {

                    slidesTrack.style.transform =
                        `translate3d(-${targetOffset}px, 0, 0)`;

                }



                /*
                SZIRMOK KICSIT LEMARADNAK.
                */

                applyPetalParallax(
                    deltaX
                );

            }
        );



        function finishSlideDrag() {

            if (!pointerDown) {
                return;
            }


            pointerDown =
                false;


            slidesViewport.classList.remove(
                "dragging"
            );


            if (slidesTrack) {

                slidesTrack.classList.remove(
                    "dragging"
                );

            }


            const deltaX =
                pointerCurrentX -
                pointerStartX;


            const threshold =
                Math.min(
                    110,
                    sliderWidth * 0.16
                );


            if (
                deltaX < -threshold
            ) {

                nextSlide();


            } else if (
                deltaX > threshold
            ) {

                previousSlide();


            } else {

                applySlidePosition(
                    true
                );

            }


            resetPetalParallax();

        }


        slidesViewport.addEventListener(
            "pointerup",
            finishSlideDrag
        );


        slidesViewport.addEventListener(
            "pointercancel",
            finishSlideDrag
        );

    }



    /* ============================================= */
    /* BILLENTYŰZET                                  */
    /* ============================================= */

    window.addEventListener(
        "keydown",
        (
            event
        ) => {

            if (
                !weddingSite
                ||
                weddingSite.hidden
            ) {

                return;

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextSlide();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousSlide();

            }

        }
    );



    /* ============================================= */
    /* RESIZE                                        */
    /* ============================================= */

    window.addEventListener(
        "resize",
        () => {

            updateSliderWidth();

            applySlidePosition(
                false
            );

        }
    );



    /* ============================================= */
    /* NYELV GOMBOK                                  */
    /* ============================================= */

    if (huButton) {

        huButton.addEventListener(
            "click",
            () => {

                setLanguage(
                    "hu"
                );

            }
        );

    }


    if (viButton) {

        viButton.addEventListener(
            "click",
            () => {

                setLanguage(
                    "vi"
                );

            }
        );

    }



    /* ============================================= */
    /* ZENE                                          */
    /* ============================================= */

    if (
        music
        &&
        musicButton
    ) {

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

    }



    /* ============================================= */
    /* HANGERŐ                                       */
    /* ============================================= */

    if (
        music
        &&
        volumeControl
    ) {

        const savedVolume =
            localStorage.getItem(
                "weddingVolume"
            );


        let initialVolume =
            0.35;


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

                initialVolume =
                    parsedVolume;

            }

        }


        music.volume =
            initialVolume;


        volumeControl.value =
            String(
                initialVolume
            );


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

    }



    if (music) {

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

    }



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



    /* ============================================= */
    /* SZIRMOK                                       */
    /* ============================================= */

    const burgundyColors = [

        "#6f1d2e",

        "#7a2638",

        "#5f1828",

        "#812a40",

        "#751f35"

    ];



    function createPetal(
        container
    ) {

        if (
            reducedMotion.matches
            ||
            !container
            ||
            !weddingSite
            ||
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


        petal.style.animationDelay =
            `${
                Math.random()
                *
                0.8
            }s`;


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


        container.appendChild(
            petal
        );


        setTimeout(
            () => {

                petal.remove();

            },
            (
                duration
                +
                1
            )
            *
            1000
        );

    }



    function createPetalsForNearbySlides() {

        slidePetalContainers.forEach(
            (
                container,
                index
            ) => {

                /*
                Csak az aktuális és a közvetlen
                szomszédos diákon generálunk.
                */

                const distance =
                    Math.abs(
                        index -
                        currentSlide
                    );


                if (
                    distance <= 1
                    &&
                    Math.random() > 0.60
                ) {

                    createPetal(
                        container
                    );

                }

            }
        );

    }



    setInterval(
        createPetalsForNearbySlides,
        1350
    );



    /*
    Kezdéskor legyen már néhány szirom,
    ne kelljen várni az elsőre.
    */

    slidePetalContainers.forEach(
        (
            container
        ) => {

            for (
                let i = 0;
                i < 3;
                i++
            ) {

                setTimeout(
                    () => {

                        createPetal(
                            container
                        );

                    },
                    i * 450
                );

            }

        }
    );



    /* ============================================= */
    /* CSILLÁM                                       */
    /* ============================================= */

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



    function createSparkle(
        x,
        y
    ) {

        if (
            reducedMotion.matches
            ||
            !weddingSite
            ||
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


        sparkle.style.left =
            `${
                x
                +
                (
                    Math.random()
                    -
                    0.5
                )
                *
                18
            }px`;


        sparkle.style.top =
            `${
                y
                +
                (
                    Math.random()
                    -
                    0.5
                )
                *
                18
            }px`;


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


        setTimeout(
            () => {

                sparkle.remove();

            },
            700
        );

    }



    window.addEventListener(
        "pointerdown",
        (
            event
        ) => {

            if (
                event.pointerType ===
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
        () => {

            touchIsActive =
                false;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "pointercancel",
        () => {

            touchIsActive =
                false;

        },
        {
            passive: true
        }
    );



    window.addEventListener(
        "pointermove",
        (
            event
        ) => {

            if (
                reducedMotion.matches
                ||
                !weddingSite
                ||
                weddingSite.hidden
            ) {

                return;

            }


            if (
                event.pointerType ===
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

        },
        {
            passive: true
        }
    );



    /* ============================================= */
    /* INICIALIZÁLÁS                                 */
    /* ============================================= */

    updateSliderWidth();


    goToSlide(
        0
    );


    const savedLanguage =
        localStorage.getItem(
            "weddingLanguage"
        );


    setLanguage(

        savedLanguage === "vi"
            ? "vi"
            : "hu"

    );


    updateAudioUI();


    const alreadyAuthenticated =
        localStorage.getItem(
            "weddingAuthenticated"
        );


    if (
        alreadyAuthenticated ===
        "true"
    ) {

        showWeddingSite();


    } else {

        showLoginScreen();

    }

}



/* ================================================= */
/* INDÍTÁS                                           */
/* ================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initWeddingWebsite
    );


} else {

    initWeddingWebsite();

}