<?php

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nome = $_POST['nome'] ?? '';
    $celular = $_POST['celular'] ?? '';
    $email = $_POST['email'] ?? '';
    $cidade = $_POST['cidade'] ?? '';
    $atividade = $_POST['atividade'] ?? '';

    $mail = new PHPMailer(true);

    try {

        $mail->isMail();
        $mail->CharSet = 'UTF-8';

        $mail->setFrom('razao.jur@contabilrazao.com.br', 'Site Contábil Razão');
        $mail->addAddress('razao.jur@contabilrazao.com.br');
        $mail->addReplyTo($email, $nome);

        $mail->Subject = 'Novo contato pelo site';
        $mail->Body =
        "
        Nome: $nome
        Email: $email
        Telefone: $celular
        Cidade: $cidade
        Atividade: $atividade";

        $mail->send();

        // Caminho certo para o obrigado
        header("Location: https://contabilrazao.com.br/backend/obrigado/obrigado.html");
        exit();

    } catch (Exception $e) {
        echo 'Erro ao enviar: ' . $mail->ErrorInfo;
        exit();
    }
}

echo 'Requisição inválida.';
exit();
?>
