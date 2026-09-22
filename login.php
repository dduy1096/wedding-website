<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';


if (is_logged_in()) {

    header('Location: index.php');
    exit;
}


$error = false;


/*
|--------------------------------------------------------------------------
| CSRF TOKEN
|--------------------------------------------------------------------------
*/

if (empty($_SESSION['login_csrf'])) {

    $_SESSION['login_csrf'] =
        bin2hex(random_bytes(32));
}


/*
|--------------------------------------------------------------------------
| BELÉPÉS
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $csrf =
        $_POST['csrf'] ?? '';

    $password =
        $_POST['password'] ?? '';


    if (
        !hash_equals(
            $_SESSION['login_csrf'],
            $csrf
        )
    ) {

        $error = true;

    } elseif (check_password($password)) {

        login_user();

        unset($_SESSION['login_csrf']);

        header('Location: index.php');

        exit;

    } else {

        $error = true;
    }
}

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

    <title>Esküvő ♡</title>


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


    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }


        html,
        body {
            width: 100%;
            min-height: 100%;
        }


        body {

            min-height: 100svh;

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 24px;

            background: #fdfcf9;

            color: #111111;

            font-family: "Inter", sans-serif;

        }


        /*
        |--------------------------------------------------------------------------
        | NYELVVÁLTÓ
        |--------------------------------------------------------------------------
        */

        .language-switcher {

            position: fixed;

            top: 22px;
            right: 22px;

            display: flex;
            align-items: center;

            gap: 8px;

            z-index: 100;

            font-size: 11px;

            letter-spacing: 1.3px;

            color: #c0c0c0;

        }


        .lang-button {

            width: auto;

            padding: 4px 2px;

            border: none;

            border-radius: 0;

            background: transparent;

            color: #999999;

            font-family: "Inter", sans-serif;

            font-size: 11px;

            letter-spacing: 1.3px;

            cursor: pointer;

            transition:
                color 0.2s ease,
                transform 0.2s ease;

        }


        .lang-button:hover {

            color: #6f1d2e;

            transform: translateY(-1px);

        }


        .lang-button.active {

            color: #6f1d2e;

        }


        /*
        |--------------------------------------------------------------------------
        | LOGIN DOBOZ
        |--------------------------------------------------------------------------
        */

        .login-box {

            width: 100%;

            max-width: 390px;

            padding: 46px 34px;

            text-align: center;

            background:
                rgba(
                    255,
                    255,
                    255,
                    0.68
                );

            border:
                1px solid
                rgba(
                    111,
                    29,
                    46,
                    0.10
                );

            border-radius: 28px;

            box-shadow:
                0 18px 60px
                rgba(
                    40,
                    20,
                    20,
                    0.06
                );

            backdrop-filter: blur(8px);

            animation:
                fadeIn
                0.9s
                ease-out;

        }


        .heart {

            margin-bottom: 16px;

            color: #6f1d2e;

            font-family:
                "Cormorant Garamond",
                serif;

            font-size: 34px;

            line-height: 1;

        }


        h1 {

            margin-bottom: 12px;

            font-family:
                "Cormorant Garamond",
                serif;

            font-weight: 400;

            font-size: 38px;

            line-height: 1.1;

        }


        .description {

            max-width: 290px;

            margin:
                0 auto
                30px;

            color: #777777;

            font-size: 10px;

            line-height: 1.8;

            letter-spacing: 1.2px;

            text-transform: uppercase;

        }


        /*
        |--------------------------------------------------------------------------
        | FORM
        |--------------------------------------------------------------------------
        */

        .password-wrapper {

            margin-bottom: 14px;

        }


        .password-input {

            width: 100%;

            padding:
                15px
                18px;

            border:
                1px solid
                rgba(
                    111,
                    29,
                    46,
                    0.22
                );

            border-radius: 999px;

            outline: none;

            background:
                rgba(
                    255,
                    255,
                    255,
                    0.82
                );

            color: #111111;

            font-family:
                "Inter",
                sans-serif;

            font-size: 14px;

            text-align: center;

            transition:
                border-color
                0.2s ease,
                box-shadow
                0.2s ease,
                background
                0.2s ease;

        }


        .password-input::placeholder {

            color: #aaaaaa;

        }


        .password-input:focus {

            border-color: #6f1d2e;

            background: #ffffff;

            box-shadow:
                0 0 0 3px
                rgba(
                    111,
                    29,
                    46,
                    0.06
                );

        }


        .login-button {

            width: 100%;

            padding:
                14px
                20px;

            border: none;

            border-radius: 999px;

            background: #6f1d2e;

            color: #ffffff;

            font-family:
                "Inter",
                sans-serif;

            font-size: 10px;

            letter-spacing: 2px;

            text-transform: uppercase;

            cursor: pointer;

            transition:
                transform
                0.2s ease,
                background-color
                0.2s ease,
                box-shadow
                0.2s ease;

        }


        .login-button:hover {

            transform: translateY(-1px);

            background: #5f1828;

            box-shadow:
                0 8px 24px
                rgba(
                    111,
                    29,
                    46,
                    0.18
                );

        }


        /*
        |--------------------------------------------------------------------------
        | HIBA
        |--------------------------------------------------------------------------
        */

        .error {

            margin-top: 18px;

            color: #6f1d2e;

            font-size: 11px;

        }


        /*
        |--------------------------------------------------------------------------
        | ANIMÁCIÓ
        |--------------------------------------------------------------------------
        */

        @keyframes fadeIn {

            from {

                opacity: 0;

                transform:
                    translateY(12px);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }


        /*
        |--------------------------------------------------------------------------
        | MOBIL
        |--------------------------------------------------------------------------
        */

        @media (max-width: 600px) {

            body {

                padding:
                    20px
                    16px;

            }


            .language-switcher {

                top: 16px;
                right: 16px;

            }


            .login-box {

                max-width: 360px;

                padding:
                    40px
                    24px;

                border-radius: 24px;

            }


            h1 {

                font-size: 34px;

            }


            .description {

                font-size: 9px;

                letter-spacing: 1px;

            }

        }


        @media (prefers-reduced-motion: reduce) {

            .login-box {

                animation: none;

            }

        }

    </style>

</head>


<body>


    <!-- NYELVVÁLTÓ -->

    <div class="language-switcher">

        <button
            id="loginHuButton"
            class="lang-button active"
            type="button"
        >
            HU
        </button>

        <span>|</span>

        <button
            id="loginViButton"
            class="lang-button"
            type="button"
        >
            VI
        </button>

    </div>



    <!-- LOGIN -->

    <main class="login-box">


        <div class="heart">
            ♡
        </div>


        <h1 id="loginTitle">
            Üdvözlünk
        </h1>


        <p
            id="loginDescription"
            class="description"
        >
            Kérjük, add meg a meghívóban található jelszót
        </p>


        <form
            method="post"
            autocomplete="off"
        >


            <input
                type="hidden"
                name="csrf"
                value="<?= htmlspecialchars(
                    $_SESSION['login_csrf'],
                    ENT_QUOTES,
                    'UTF-8'
                ) ?>"
            >


            <div class="password-wrapper">

                <input
                    id="passwordInput"
                    class="password-input"
                    type="password"
                    name="password"
                    placeholder="Jelszó"
                    required
                    autofocus
                    autocomplete="current-password"
                >

            </div>


            <button
                id="loginButton"
                class="login-button"
                type="submit"
            >
                Belépés
            </button>


        </form>


        <?php if ($error): ?>

            <p
                id="loginError"
                class="error"
            >
                Hibás jelszó ♡
            </p>

        <?php endif; ?>


    </main>



    <!--
    ============================================================
    JAVASCRIPT
    FONTOS: A BODY VÉGÉN VAN, ÍGY A HTML ELEMEK MÁR LÉTEZNEK
    ============================================================
    -->

    <script>

        const loginHuButton =
            document.getElementById(
                "loginHuButton"
            );


        const loginViButton =
            document.getElementById(
                "loginViButton"
            );


        const loginTitle =
            document.getElementById(
                "loginTitle"
            );


        const loginDescription =
            document.getElementById(
                "loginDescription"
            );


        const passwordInput =
            document.getElementById(
                "passwordInput"
            );


        const loginButton =
            document.getElementById(
                "loginButton"
            );


        const loginError =
            document.getElementById(
                "loginError"
            );



        function setLoginLanguage(language) {


            if (language === "vi") {


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


                if (loginError) {

                    loginError.textContent =
                        "Mật khẩu không đúng ♡";

                }


                loginViButton.classList.add(
                    "active"
                );


                loginHuButton.classList.remove(
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


                if (loginError) {

                    loginError.textContent =
                        "Hibás jelszó ♡";

                }


                loginHuButton.classList.add(
                    "active"
                );


                loginViButton.classList.remove(
                    "active"
                );

            }


            localStorage.setItem(
                "weddingLanguage",
                language
            );

        }



        loginHuButton.addEventListener(
            "click",
            () => {

                setLoginLanguage("hu");

            }
        );


        loginViButton.addEventListener(
            "click",
            () => {

                setLoginLanguage("vi");

            }
        );



        const savedLanguage =
            localStorage.getItem(
                "weddingLanguage"
            );


        setLoginLanguage(
            savedLanguage === "vi"
                ? "vi"
                : "hu"
        );

    </script>


</body>

</html>