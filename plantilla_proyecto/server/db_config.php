<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'nombre_bbdd');
define('DB_USER', 'root');
define('DB_PASS', 'password_usuario_postgre');

function conectarBBDD(): PDO {

        // Configuración de la conexión a PostgreSQL
        $dsn = 'pgsql:host=' . DB_HOST . ';port=5432; dbname=' . DB_NAME;

        //comportamiento de la conexión de la base de datos
        $opciones = [

            //LANZA EXCEPCIONES EN CASO DE ERROR
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

            //RESULTADOS DE LAS CONSULTAS
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

            //DESACTIVA LA EMULACIÓN DE PREPARADOS PARA USAR LOS PREPARADOS NATIVOS DE POSTGRESQL
            PDO::ATTR_EMULATE_PREPARES => false,

        ];

    try {
        
        $com = new PDO($dsn, DB_USER, DB_PASS, $opciones);
        return $com;

    } catch (PDOException $e) {
        http_response_code(500);

        echo json_encode(['error' => 'Error de conexión a la base de datos' . $e->getMessage()]);

        exit;
    }
}