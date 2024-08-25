<?php

require __DIR__ . '/repositories/ClientRepository.php';

$clientRepository = new ClientRepository();
header('Content-Type: application/json');
$total = $clientRepository->countTotal();
$limit = 10;
$offset = $_GET['page'] ? ($_GET['page'] - 1) * $limit : 0;

$return = [
    'numberPages' => ceil($total/10),
    'clients' => $clientRepository->getAll($limit, $offset)
];

echo json_encode($return);
