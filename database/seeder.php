<?php

require_once '../vendor/autoload.php';
require_once __DIR__ . '/../repositories/ClientRepository.php';

$faker = Faker\Factory::create('pt_BR');

$faker->addProvider(new Faker\Provider\pt_BR\PhoneNumber($faker));
$clientRepository = new ClientRepository();

for ($i = 0; $i < 120; ++$i) {
    $name = $faker->unique()->name();
    $phone = $faker->unique()->cellphoneNumber();
    $email = $faker->unique()->email();

    $clientRepository->insert($name, $phone, $email);
}