<?php

declare(strict_types=1);


/*
|--------------------------------------------------------------------------
| ESKÜVŐI OLDAL JELSZAVA
|--------------------------------------------------------------------------
|
| CSAK EZT AZ EGY SORT KELL ÁTÍRNOD.
|
*/

const WEDDING_PASSWORD = '888';


/*
|--------------------------------------------------------------------------
| SESSION BEÁLLÍTÁSOK
|--------------------------------------------------------------------------
*/

$usingHttps =
    !empty($_SERVER['HTTPS']) &&
    $_SERVER['HTTPS'] !== 'off';


ini_set('session.use_strict_mode', '1');


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
| SEGÉDFÜGGVÉNYEK
|--------------------------------------------------------------------------
*/

function is_logged_in(): bool
{
    return isset($_SESSION['wedding_authenticated'])
        && $_SESSION['wedding_authenticated'] === true;
}


function require_login(): void
{
    if (!is_logged_in()) {

        header('Location: login.php');

        exit;
    }
}


function check_password(string $password): bool
{
    return hash_equals(
        hash('sha256', WEDDING_PASSWORD),
        hash('sha256', $password)
    );
}


function login_user(): void
{
    session_regenerate_id(true);

    $_SESSION['wedding_authenticated'] = true;
}


function logout_user(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {

        $params = session_get_cookie_params();

        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
}