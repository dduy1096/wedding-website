<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';


require_login();


header(
    'Cache-Control: private, no-store'
);

?>

<!DOCTYPE html>

<html lang="hu">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="robots"
        content="noindex, nofollow"
    >

    <meta
        name="description"
        content="Esküvő – 2027. május 21."
    >


    <title>
        Esküvő – 2027.05.21.
    </title>


    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@300;400&display=swap"
        rel="stylesheet"
    >


    <link
        rel="stylesheet"
        href="asset.php?file=style.css"
    >

</head>


<body>


    <!-- LEHULLÓ SZIRMOK -->

    <div id="petals"></div>



    <!-- NYELVVÁLTÓ -->

    <div class="language-switcher">


        <button
            id="huButton"
            class="lang-button active"
            type="button"
        >

            HU

        </button>


        <span>|</span>


        <button
            id="viButton"
            class="lang-button"
            type="button"
        >

            VI

        </button>


    </div>



    <!-- SAVE THE DATE -->

    <main class="hero">


        <div class="card">


            <img

                id="saveTheDateImage"

                src="asset.php?file=images/save-the-date-hu.jpg"

                alt="Save the Date – 2027. május 21."

                class="save-the-date"

            >



            <div class="message">


                <p
                    id="comingSoon"
                    class="coming-soon"
                >

                    A részletekkel hamarosan jelentkezünk ♡

                </p>


            </div>


        </div>


    </main>



    <!-- ZENE -->

    <audio
        id="weddingMusic"
        loop
        preload="metadata"
    >


        <source

            src="asset.php?file=music/wedding-music.wav"

            type="audio/wav"

        >


    </audio>



    <!-- AUDIO VEZÉRLÉS -->

    <div

        id="audioControls"

        class="audio-controls"

    >


        <button

            id="musicButton"

            class="music-button"

            type="button"

            aria-label="Zene lejátszása"

        >

            ♪

        </button>



        <input

            id="volumeControl"

            class="volume-control"

            type="range"

            min="0"

            max="1"

            step="0.05"

            value="0.35"

            aria-label="Hangerő"

        >


    </div>



    <script
        src="asset.php?file=script.js"
    ></script>


</body>

</html>