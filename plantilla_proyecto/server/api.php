<?php

require_once 'db_config.php';

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');

$pdo = conectarBBDD();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM tabla WHERE ...');

    // Ejemplo

    $usuarios = $stmt->fetchAll();

    echo json_encode($usuarios);
    
}else if ($method === 'POST') {

    $datos = json_decode(file_get_contents('php://input'), true);

    $stmt = $pdo->prepare('INSERT INTO tabla (columna1, columna2) VALUES (:valor1, :valor2)');

    $stmt->execute([
        ':valor1' => $datos['campo1'],
        ':valor2' => $datos['campo2']
    ]);

    echo json_encode(['ok' => true,
        'message' => 'Registro insertado correctamente']);
        
}