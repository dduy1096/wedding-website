<?php

declare(strict_types=1);


/*
|--------------------------------------------------------------------------
| HELYI / TITKOS KONFIGURÁCIÓ BETÖLTÉSE
|--------------------------------------------------------------------------
*/

$localConfigPath =
    __DIR__ . '/config.local.php';


if (!is_file($localConfigPath)) {

    http_response_code(500);

    exit(
        'Hiányzik a config.local.php fájl.'
    );
}


$localConfig =
    require $localConfigPath;



/*
|--------------------------------------------------------------------------
| KONFIGURÁCIÓ ELLENŐRZÉSE
|--------------------------------------------------------------------------
*/

if (
    !is_array($localConfig)
    ||
    !isset($localConfig['wedding_password'])
    ||
    !is_string($localConfig['wedding_password'])
    ||
    $localConfig['wedding_password'] === ''
) {

    http_response_code(500);

    exit(
        'Az esküvői jelszó nincs megfelelően beállítva.'
    );
}


define(
    'WEDDING_PASSWORD',
    $localConfig['wedding_password']
);



/*
|--------------------------------------------------------------------------
| HTTPS ÉSZLELÉSE
|--------------------------------------------------------------------------
*/

$usingHttps =
    !empty($_SERVER['HTTPS'])
    &&
    $_SERVER['HTTPS'] !== 'off';



/*
|--------------------------------------------------------------------------
| SESSION BEÁLLÍTÁSOK
|--------------------------------------------------------------------------
*/

ini_set(
    'session.use_strict_mode',
    '1'
);


ini_set(
    'session.use_only_cookies',
    '1'
);


session_name(
    'wedding_session'
);


session_set_cookie_params([

    'lifetime' => 0,

    'path' => '/',

    'secure' => $usingHttps,

    'httponly' => true,

    'samesite' => 'Lax'

]);


session_start();



/*
|--------------------------------------------------------------------------
| BEJELENTKEZÉS ELLENŐRZÉSE
|--------------------------------------------------------------------------
*/

function is_logged_in(): bool
{

    return
        isset(
            $_SESSION[
                'wedding_authenticated'
            ]
        )
        &&
        $_SESSION[
            'wedding_authenticated'
        ] === true;

}



/*
|--------------------------------------------------------------------------
| BEJELENTKEZÉS KÉNYSZERÍTÉSE
|--------------------------------------------------------------------------
*/

function require_login(): void
{

    if (!is_logged_in()) {

        header(
            'Location: login.php'
        );

        exit;
    }

}



/*
|--------------------------------------------------------------------------
| JELSZÓ ELLENŐRZÉSE
|--------------------------------------------------------------------------
*/

function check_password(
    string $password
): bool
{

    $storedHash =
        hash(
            'sha256',
            WEDDING_PASSWORD
        );


    $providedHash =
        hash(
            'sha256',
            $password
        );


    return hash_equals(
        $storedHash,
        $providedHash
    );

}



/*
|--------------------------------------------------------------------------
| SIKERES BELÉPÉS
|--------------------------------------------------------------------------
*/

function login_user(): void
{

    session_regenerate_id(
        true
    );


    $_SESSION[
        'wedding_authenticated'
    ] = true;


    $_SESSION[
        'wedding_login_time'
    ] = time();

}



/*
|--------------------------------------------------------------------------
| KIJELENTKEZÉS
|--------------------------------------------------------------------------
*/

function logout_user(): void
{

    $_SESSION = [];


    if (
        ini_get(
            'session.use_cookies'
        )
    ) {

        $params =
            session_get_cookie_params();


        setcookie(

            session_name(),

            '',

            [

                'expires' =>
                    time() - 42000,

                'path' =>
                    $params['path'],

                'domain' =>
                    $params['domain'],

                'secure' =>
                    $params['secure'],

                'httponly' =>
                    $params['httponly'],

                'samesite' =>
                    $params['samesite']
                    ?? 'Lax'

            ]

        );

    }


    session_destroy();

}git status