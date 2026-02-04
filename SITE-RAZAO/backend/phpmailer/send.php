<?php

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Só aceita POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Requisição inválida.');
}

// Sanitização básica
$nome      = trim(htmlspecialchars($_POST['nome'] ?? ''));
$celular   = trim(htmlspecialchars($_POST['celular'] ?? ''));
$email     = trim(htmlspecialchars($_POST['email'] ?? ''));
$cidade    = trim(htmlspecialchars($_POST['cidade'] ?? ''));
$atividade = trim(htmlspecialchars($_POST['atividade'] ?? ''));

// Validação mínima
if (empty($nome) || empty($email)) {
    die('Nome e email são obrigatórios.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('Email inválido.');
}

$mail = new PHPMailer(true);

try {

    // Envio simples via mail()
    $mail->isMail();
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('razao.jur@contabilrazao.com.br', 'Site Contábil Razão');
    $mail->addAddress('razao.jur@contabilrazao.com.br');
    $mail->addReplyTo($email, $nome);

    $mail->Subject = 'Novo contato pelo site';

    // Corpo do email
    $mail->Body =
        "Nome: $nome\n" .
        "Email: $email\n" .
        "Telefone: $celular\n" .
        "Cidade: $cidade\n" .
        "Atividade: $atividade\n";

    $mail->send();

    // Redireciona após sucesso
    header("Location: https://contabilrazao.com.br/backend/obrigado/obrigado.html");
    exit();

} catch (Exception $e) {

    echo "Erro ao enviar: {$mail->ErrorInfo}";
    exit();
}
