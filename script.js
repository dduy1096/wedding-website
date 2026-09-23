function initWeddingWebsite() {

    /* ================================================= */
    /* ALAP BEÁLLÍTÁSOK                                  */
    /* ================================================= */

    const WEDDING_PASSWORD = String((13 * 13) + (31 * 23) + 6);
    const weddingDate = new Date("2027-05-21T00:00:00+02:00");

    /* ================================================= */
    /* ELEMEK                                            */
    /* ================================================= */

    const loginScreen = document.getElementById("loginScreen");
    const weddingSite = document.getElementById("weddingSite");

    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("passwordInput");
    const loginTitle = document.getElementById("loginTitle");
    const loginDescription = document.getElementById("loginDescription");
    const loginButton = document.getElementById("loginButton");
    const loginError = document.getElementById("loginError");
    const logoutButton = document.getElementById("logoutButton");

    const huButton = document.getElementById("huButton");
    const viButton = document.getElementById("viButton");

    const saveTheDateImage = document.getElementById("saveTheDateImage");
    const comingSoon = document.getElementById("comingSoon");

    const venueEyebrow = document.getElementById("venueEyebrow");
    const venueTitle = document.getElementById("venueTitle");
    const mapsLink = document.getElementById("mapsLink");

    const countdownDays = document.getElementById("countdownDays");
    const countdownHours = document.getElementById("countdownHours");
    const countdownMinutes = document.getElementById("countdownMinutes");
    const countdownSeconds = document.getElementById("countdownSeconds");

    const countdownDaysLabel = document.getElementById("countdownDaysLabel");
    const countdownHoursLabel = document.getElementById("countdownHoursLabel");
    const countdownMinutesLabel = document.getElementById("countdownMinutesLabel");
    const countdownSecondsLabel = document.getElementById("countdownSecondsLabel");

    const swipeHint = document.getElementById("swipeHint");

    const slidesViewport = document.getElementById("slidesViewport");
    const slidesTrack = document.getElementById("slidesTrack");
    const slides = [...document.querySelectorAll(".wedding-slide")];
    const petalsTrack = document.getElementById("petalsTrack");

    const prevSlideButton = document.getElementById("prevSlideButton");
    const nextSlideButton = document.getElementById("nextSlideButton");
    const slideDots = [...document.querySelectorAll(".slide-dot")];

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");
    const volumeControl = document.getElementById("volumeControl");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* ================================================= */
    /* ÁLLAPOT                                           */
    /* ================================================= */

    let loginSubmitting = false;

    let currentSlide = 0;

    let pointerDown = false;
    let pointerStartY = 0;
    let pointerCurrentY = 0;
    let sliderHeight = 0;

    let wheelLocked = false;
    let wheelAccumulator = 0;
    let wheelResetTimer = null;

    let lastSparkleTime = 0;
    let touchIsActive = false;

    /* ================================================= */
    /* SZIRMOK MAGASSÁGA                                 */
    /* ================================================= */

    if (petalsTrack) {
        petalsTrack.style.height = `${slides.length * 100}svh`;
    }

    /* ================================================= */
    /* LOGIN                                             */
    /* ================================================= */

    function clearLoginError() {
        if (loginError) {
            loginError.hidden = true;
        }
    }

    function resetLoginForm() {
        loginSubmitting = false;

        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.disabled = false;
        }

        if (loginButton) {
            loginButton.disabled = false;
        }

        clearLoginError();
    }

    function showLoginError() {
        if (loginError) {
            loginError.hidden = false;
        }

        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.disabled = false;
        }

        if (loginButton) {
            loginButton.disabled = false;
        }

        loginSubmitting = false;

        requestAnimationFrame(() => {
            passwordInput?.focus();
        });
    }

    if (loginForm && passwordInput) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();

            if (loginSubmitting) {
                return;
            }

            clearLoginError();

            const enteredPassword = passwordInput.value.trim();

            if (!enteredPassword) {
                passwordInput.focus();
                return;
            }

            loginSubmitting = true;

            if (loginButton) {
                loginButton.disabled = true;
            }

            if (enteredPassword === WEDDING_PASSWORD) {

                passwordInput.blur();

                localStorage.setItem(
                    "weddingAuthenticated",
                    "true"
                );

                setTimeout(showWeddingSite, 40);

            } else {

                setTimeout(showLoginError, 120);

            }
        });


        passwordInput.addEventListener(
            "input",
            clearLoginError
        );

        passwordInput.addEventListener(
            "paste",
            clearLoginError
        );
    }

    /* ================================================= */
    /* OLDALAK                                           */
    /* ================================================= */

    function showLoginScreen() {

        if (weddingSite) {
            weddingSite.hidden = true;
        }

        if (loginScreen) {
            loginScreen.hidden = false;
        }

        stopMusic();

        goToSlide(0);

        resetLoginForm();

        setTimeout(() => {
            passwordInput?.focus();
        }, 100);
    }

    function showWeddingSite() {

        if (loginScreen) {
            loginScreen.hidden = true;
        }

        if (weddingSite) {
            weddingSite.hidden = false;
        }

        resetLoginForm();

        requestAnimationFrame(() => {
            updateSliderHeight();
            applySlidePosition(true);
        });
    }

    logoutButton?.addEventListener("click", () => {

        localStorage.removeItem(
            "weddingAuthenticated"
        );

        showLoginScreen();
    });

    /* ================================================= */
    /* SLIDER                                            */
    /* ================================================= */

    function updateSliderHeight() {
        if (!slidesViewport) {
            return;
        }

        sliderHeight = slidesViewport.clientHeight;
    }

    function resetPetalParallax() {
        if (!petalsTrack) {
            return;
        }

        petalsTrack.classList.remove("dragging");
        petalsTrack.style.transform = "translate3d(0, 0, 0)";
    }

    function applyPetalParallax(deltaY) {
        if (!petalsTrack) {
            return;
        }

        const parallaxAmount = -deltaY * 0.12;

        petalsTrack.classList.add("dragging");

        petalsTrack.style.transform =
            `translate3d(0, ${parallaxAmount}px, 0)`;
    }

    function applySlidePosition(animated = true) {
        if (!slidesTrack) {
            return;
        }

        slidesTrack.classList.toggle(
            "dragging",
            !animated
        );

        const offset = currentSlide * 100;

        slidesTrack.style.transform =
            `translate3d(0, -${offset}%, 0)`;

        resetPetalParallax();
    }

    function updateSliderUI() {

        slideDots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === currentSlide
            );
        });

        if (prevSlideButton) {
            prevSlideButton.disabled = currentSlide === 0;
        }

        if (nextSlideButton) {
            nextSlideButton.disabled =
                currentSlide === slides.length - 1;
        }

        if (swipeHint && currentSlide !== 0) {
            swipeHint.classList.add("hidden");
        }
    }

    function goToSlide(index) {

        const maxIndex = slides.length - 1;

        currentSlide = Math.min(
            maxIndex,
            Math.max(0, index)
        );

        applySlidePosition(true);
        updateSliderUI();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }


    function previousSlide() {
        goToSlide(currentSlide - 1);
    }

    prevSlideButton?.addEventListener(
        "click",
        previousSlide
    );

    nextSlideButton?.addEventListener(
        "click",
        nextSlide
    );

    slideDots.forEach(dot => {

        dot.addEventListener("click", () => {

            const target = Number(
                dot.dataset.slideTarget
            );

            if (Number.isInteger(target)) {
                goToSlide(target);
            }
        });
    });

    /* ================================================= */
    /* TOUCH / SWIPE                                     */
    /* ================================================= */

    if (slidesViewport) {

        slidesViewport.addEventListener(
            "pointerdown",
            event => {

                /*
                Linkek, gombok és a Google Maps
                maradjanak külön interaktívak.
                */
                if (
                    event.target.closest(
                        "iframe, a, button, input, select, textarea"
                    )
                ) {
                    return;
                }

                pointerDown = true;

                pointerStartY = event.clientY;
                pointerCurrentY = event.clientY;

                updateSliderHeight();

                slidesViewport.classList.add(
                    "dragging"
                );

                slidesTrack?.classList.add(
                    "dragging"
                );

                petalsTrack?.classList.add(
                    "dragging"
                );

                slidesViewport.setPointerCapture(
                    event.pointerId
                );
            }
        );

        slidesViewport.addEventListener(
            "pointermove",
            event => {

                if (!pointerDown) {
                    return;
                }

                pointerCurrentY = event.clientY;

                const deltaY =
                    pointerCurrentY - pointerStartY;

                const baseOffset =
                    currentSlide * sliderHeight;

                let targetOffset =
                    baseOffset - deltaY;


                /*
                GUMIHATÁS A KÉT SZÉLEN
                */

                if (
                    currentSlide === 0 &&
                    deltaY > 0
                ) {
                    targetOffset =
                        baseOffset - deltaY * 0.25;
                }

                if (
                    currentSlide === slides.length - 1 &&
                    deltaY < 0
                ) {
                    targetOffset =
                        baseOffset - deltaY * 0.25;
                }


                if (slidesTrack && sliderHeight > 0) {

                    slidesTrack.style.transform =
                        `translate3d(0, -${targetOffset}px, 0)`;
                }

                applyPetalParallax(deltaY);
            }
        );

        function finishSlideDrag() {

            if (!pointerDown) {
                return;
            }

            pointerDown = false;

            slidesViewport.classList.remove(
                "dragging"
            );

            slidesTrack?.classList.remove(
                "dragging"
            );

            const deltaY =
                pointerCurrentY - pointerStartY;

            const threshold = Math.min(
                110,
                sliderHeight * 0.16
            );


            if (deltaY < -threshold) {

                nextSlide();

            } else if (deltaY > threshold) {

                previousSlide();

            } else {

                applySlidePosition(true);

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

    /* ================================================= */
    /* EGÉRGÖRGŐ / TOUCHPAD                              */
    /* ================================================= */

    if (slidesViewport) {

        slidesViewport.addEventListener(
            "wheel",
            event => {

                /*
                Ctrl + görgő és trackpad pinch:
                hagyjuk a böngésző zoomját.
                */
                if (event.ctrlKey || event.metaKey) {
                    return;
                }


                /*
                Google Maps saját scrollja.
                */
                if (event.target.closest("iframe")) {
                    return;
                }


                /*
                Oldalirányú trackpad mozdulat.
                */
                if (
                    Math.abs(event.deltaY) <=
                    Math.abs(event.deltaX)
                ) {
                    return;
                }


                event.preventDefault();

                wheelAccumulator += event.deltaY;

                clearTimeout(wheelResetTimer);

                wheelResetTimer = setTimeout(() => {
                    wheelAccumulator = 0;
                }, 160);


                if (wheelLocked) {
                    return;
                }


                const threshold = 45;


                if (wheelAccumulator > threshold) {

                    if (
                        currentSlide <
                        slides.length - 1
                    ) {
                        nextSlide();
                        wheelLocked = true;
                    }

                    wheelAccumulator = 0;

                } else if (
                    wheelAccumulator < -threshold
                ) {

                    if (currentSlide > 0) {
                        previousSlide();
                        wheelLocked = true;
                    }

                    wheelAccumulator = 0;
                }


                if (wheelLocked) {

                    setTimeout(() => {
                        wheelLocked = false;
                    }, 850);

                }

            },
            {
                passive: false
            }
        );
    }

    /* ================================================= */
    /* BILLENTYŰZET                                      */
    /* ================================================= */

    window.addEventListener(
        "keydown",
        event => {

            if (
                !weddingSite ||
                weddingSite.hidden
            ) {
                return;
            }

            if (event.key === "ArrowDown") {
                nextSlide();
            }

            if (event.key === "ArrowUp") {
                previousSlide();
            }
        }
    );

    /* ================================================= */
    /* RESIZE                                            */
    /* ================================================= */

    window.addEventListener(
        "resize",
        () => {
            updateSliderHeight();
            applySlidePosition(false);
        }
    );

    /* ================================================= */
    /* COUNTDOWN                                         */
    /* ================================================= */

    function updateCountdown() {

        if (
            !countdownDays ||
            !countdownHours ||
            !countdownMinutes ||
            !countdownSeconds
        ) {
            return;
        }


        const now = new Date();

        let difference =
            weddingDate.getTime() -
            now.getTime();


        if (difference <= 0) {

            countdownDays.textContent = "000";
            countdownHours.textContent = "00";
            countdownMinutes.textContent = "00";
            countdownSeconds.textContent = "00";

            return;
        }


        const SECOND = 1000;
        const MINUTE = SECOND * 60;
        const HOUR = MINUTE * 60;
        const DAY = HOUR * 24;


        const days = Math.floor(
            difference / DAY
        );

        difference -= days * DAY;


        const hours = Math.floor(
            difference / HOUR
        );

        difference -= hours * HOUR;


        const minutes = Math.floor(
            difference / MINUTE
        );

        difference -= minutes * MINUTE;


        const seconds = Math.floor(
            difference / SECOND
        );


        countdownDays.textContent =
            String(days).padStart(3, "0");

        countdownHours.textContent =
            String(hours).padStart(2, "0");

        countdownMinutes.textContent =
            String(minutes).padStart(2, "0");

        countdownSeconds.textContent =
            String(seconds).padStart(2, "0");
    }

    /* ================================================= */
    /* NYELV                                             */
    /* ================================================= */

    function setLanguage(language) {

        const isVietnamese =
            language === "vi";


        document.documentElement.lang =
            isVietnamese ? "vi" : "hu";


        if (loginTitle) {
            loginTitle.textContent =
                isVietnamese
                    ? "Chào mừng"
                    : "Üdvözlünk";
        }


        if (loginDescription) {
            loginDescription.textContent =
                isVietnamese
                    ? "Vui lòng nhập mật khẩu có trong thiệp mời"
                    : "Kérjük, add meg a meghívóban található jelszót";
        }


        if (passwordInput) {
            passwordInput.placeholder =
                isVietnamese
                    ? "Mật khẩu"
                    : "Jelszó";
        }


        if (loginButton) {
            loginButton.textContent =
                isVietnamese
                    ? "Đăng nhập"
                    : "Belépés";
        }


        if (loginError) {
            loginError.textContent =
                isVietnamese
                    ? "Mật khẩu không đúng ♡"
                    : "Hibás jelszó ♡";
        }


        if (saveTheDateImage) {

            saveTheDateImage.src =
                isVietnamese
                    ? "images/save-the-date-vn.jpg"
                    : "images/save-the-date-hu.jpg";

            saveTheDateImage.alt =
                isVietnamese
                    ? "Save the Date – 21 tháng 5 năm 2027"
                    : "Save the Date – 2027. május 21.";
        }


        if (comingSoon) {
            comingSoon.textContent =
                isVietnamese
                    ? "Thông tin chi tiết sẽ sớm được cập nhật ♡"
                    : "A részletekkel hamarosan jelentkezünk ♡";
        }


        if (venueEyebrow) {
            venueEyebrow.textContent =
                isVietnamese
                    ? "Địa điểm"
                    : "Helyszín";
        }


        if (venueTitle) {
            venueTitle.textContent =
                "Dudok Rendezvényház";
        }


        if (mapsLink) {
            mapsLink.textContent =
                isVietnamese
                    ? "Mở trong Google Maps"
                    : "Megnyitás Google Maps-ben";
        }


        if (swipeHint) {
            swipeHint.textContent =
                isVietnamese
                    ? "Vuốt lên / xuống ♡"
                    : "Húzd fel / le ♡";
        }


        if (logoutButton) {
            logoutButton.textContent =
                isVietnamese
                    ? "Thoát"
                    : "Kilépés";
        }


        if (countdownDaysLabel) {
            countdownDaysLabel.textContent =
                isVietnamese
                    ? "ngày"
                    : "nap";
        }


        if (countdownHoursLabel) {
            countdownHoursLabel.textContent =
                isVietnamese
                    ? "giờ"
                    : "óra";
        }


        if (countdownMinutesLabel) {
            countdownMinutesLabel.textContent =
                isVietnamese
                    ? "phút"
                    : "perc";
        }


        if (countdownSecondsLabel) {
            countdownSecondsLabel.textContent =
                isVietnamese
                    ? "giây"
                    : "másodperc";
        }


        huButton?.classList.toggle(
            "active",
            !isVietnamese
        );

        viButton?.classList.toggle(
            "active",
            isVietnamese
        );


        localStorage.setItem(
            "weddingLanguage",
            language
        );


        updateAudioUI();
    }

    huButton?.addEventListener(
        "click",
        () => setLanguage("hu")
    );

    viButton?.addEventListener(
        "click",
        () => setLanguage("vi")
    );

    /* ================================================= */
    /* AUDIO                                             */
    /* ================================================= */

    function updateAudioUI() {

        if (!music || !musicButton) {
            return;
        }

        const language =
            localStorage.getItem(
                "weddingLanguage"
            ) || "hu";

        const isVietnamese =
            language === "vi";

        const isPlaying =
            !music.paused &&
            !music.ended;

        musicButton.classList.toggle(
            "playing",
            isPlaying
        );

        musicButton.setAttribute(
            "aria-label",
            isVietnamese
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
                isVietnamese
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

    musicButton?.addEventListener(
        "click",
        async () => {

            if (!music) {
                return;
            }

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

    if (music && volumeControl) {

        const savedVolume =
            localStorage.getItem(
                "weddingVolume"
            );


        let initialVolume = 0.35;

        if (savedVolume !== null) {

            const parsedVolume =
                Number(savedVolume);


            if (
                Number.isFinite(parsedVolume) &&
                parsedVolume >= 0 &&
                parsedVolume <= 1
            ) {
                initialVolume = parsedVolume;
            }
        }

        music.volume = initialVolume;

        volumeControl.value =
            String(initialVolume);

        volumeControl.addEventListener(
            "input",
            () => {

                const volume =
                    Number(
                        volumeControl.value
                    );


                if (!Number.isFinite(volume)) {
                    return;
                }


                music.volume = Math.min(
                    1,
                    Math.max(0, volume)
                );


                localStorage.setItem(
                    "weddingVolume",
                    String(music.volume)
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

            if (document.hidden) {
                stopMusic();
            }
        }
    );

    window.addEventListener(
        "pagehide",
        stopMusic
    );

    /* ================================================= */
    /* SZIRMOK                                           */
    /* ================================================= */

    const burgundyColors = [
        "#6f1d2e",
        "#7a2638",
        "#5f1828",
        "#812a40",
        "#751f35"
    ];

    function createPetal(container) {

        if (
            reducedMotion.matches ||
            !container ||
            !weddingSite ||
            weddingSite.hidden
        ) {
            return;
        }

        const petal =
            document.createElement("span");


        petal.classList.add("petal");


        const size =
            7 + Math.random() * 7;

        petal.style.width =
            `${size}px`;

        petal.style.height =
            `${size * 1.45}px`;

        petal.style.left =
            `${Math.random() * 100}%`;

        /*
        Minél több slide van,
        annál tovább tart a teljes esés.
        */
        const duration =
            (8 + Math.random() * 6) *
            slides.length;

        petal.style.animationDuration =
            `${duration}s`;

        petal.style.animationDelay =
            `${Math.random() * 0.8}s`;

        petal.style.backgroundColor =
            burgundyColors[
                Math.floor(
                    Math.random() *
                    burgundyColors.length
                )
            ];

        petal.style.opacity =
            String(
                0.35 +
                Math.random() * 0.35
            );

        container.appendChild(petal);

        setTimeout(
            () => petal.remove(),
            (duration + 1) * 1000
        );
    }

    setInterval(
        () => {

            if (
                petalsTrack &&
                Math.random() > 0.60
            ) {
                createPetal(petalsTrack);
            }

        },
        1350
    );

    /*
    Kezdéskor rögtön legyen néhány szirom.
    */

    if (petalsTrack) {

        for (let i = 0; i < 5; i++) {

            setTimeout(
                () => createPetal(petalsTrack),
                i * 400
            );

        }
    }

    /* ================================================= */
    /* CSILLÁM                                           */
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

    function createSparkle(x, y) {

        if (
            reducedMotion.matches ||
            !weddingSite ||
            weddingSite.hidden
        ) {
            return;
        }

        const sparkle =
            document.createElement("span");


        sparkle.classList.add("sparkle");

        if (Math.random() > 0.65) {
            sparkle.classList.add("star");
        }

        const size =
            3 + Math.random() * 6;

        sparkle.style.width =
            `${size}px`;

        sparkle.style.height =
            `${size}px`;


        sparkle.style.left =
            `${x + (Math.random() - 0.5) * 18}px`;

        sparkle.style.top =
            `${y + (Math.random() - 0.5) * 18}px`;

        const color =
            sparkleColors[
                Math.floor(
                    Math.random() *
                    sparkleColors.length
                )
            ];

        sparkle.style.backgroundColor = color;
        sparkle.style.color = color;

        sparkle.style.boxShadow =
            `0 0 ${4 + Math.random() * 7}px currentColor`;

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

        setTimeout(
            () => sparkle.remove(),
            700
        );
    }

    window.addEventListener(
        "pointerdown",
        event => {

            if (
                event.pointerType ===
                "touch"
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
        () => {
            touchIsActive = false;
        },
        {
            passive: true
        }
    );

    window.addEventListener(
        "pointercancel",
        () => {
            touchIsActive = false;
        },
        {
            passive: true
        }
    );

    window.addEventListener(
        "pointermove",
        event => {

            if (
                reducedMotion.matches ||
                !weddingSite ||
                weddingSite.hidden
            ) {
                return;
            }

            if (
                event.pointerType === "touch" &&
                !touchIsActive
            ) {
                return;
            }

            const now =
                performance.now();

            if (
                now - lastSparkleTime <
                45
            ) {
                return;
            }

            lastSparkleTime = now;

            createSparkle(
                event.clientX,
                event.clientY
            );

        },
        {
            passive: true
        }
    );

    /* ================================================= */
    /* INICIALIZÁLÁS                                     */
    /* ================================================= */

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

    updateSliderHeight();

    goToSlide(0);

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

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initWeddingWebsite
    );

} else {

    initWeddingWebsite();

}