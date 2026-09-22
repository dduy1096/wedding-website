<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';


require_login();



/*
|--------------------------------------------------------------------------
| KÉRT FÁJL
|--------------------------------------------------------------------------
*/

$file =
    $_GET['file'] ?? '';


if ($file === '') {

    http_response_code(404);

    exit;
}



/*
|--------------------------------------------------------------------------
| VÉDELEM PATH TRAVERSAL ELLEN
|--------------------------------------------------------------------------
*/

$baseDirectory =
    realpath(
        __DIR__ .
        '/protected'
    );


$requestedFile =
    realpath(
        __DIR__ .
        '/protected/' .
        $file
    );


if (
    $baseDirectory === false ||
    $requestedFile === false ||
    !str_starts_with(
        $requestedFile,
        $baseDirectory .
        DIRECTORY_SEPARATOR
    ) ||
    !is_file(
        $requestedFile
    )
) {

    http_response_code(404);

    exit;
}



/*
|--------------------------------------------------------------------------
| MIME TYPE
|--------------------------------------------------------------------------
*/

$extension =
    strtolower(
        pathinfo(
            $requestedFile,
            PATHINFO_EXTENSION
        )
    );


$mimeTypes = [

    'css' =>
        'text/css; charset=UTF-8',

    'js' =>
        'application/javascript; charset=UTF-8',

    'jpg' =>
        'image/jpeg',

    'jpeg' =>
        'image/jpeg',

    'png' =>
        'image/png',

    'webp' =>
        'image/webp',

    'svg' =>
        'image/svg+xml',

    'mp3' =>
        'audio/mpeg',

    'wav' =>
        'audio/wav',

    'ogg' =>
        'audio/ogg'

];


if (
    !isset(
        $mimeTypes[$extension]
    )
) {

    http_response_code(403);

    exit;
}



header(
    'Content-Type: ' .
    $mimeTypes[$extension]
);


header(
    'Content-Length: ' .
    filesize($requestedFile)
);


header(
    'Cache-Control: private, max-age=3600'
);



readfile($requestedFile);

exit;