<?php

// IMPORTANTE: carregar os arquivos PRIMEIRO
require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// Depois usar o namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Apenas aceita POST (evita acesso direto)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Recebe dados do formulário
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $plano = $_POST['plano'] ?? '';

    // Inicia PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Usa o mail() interno do cPanel
        $mail->isMail();
        $mail->CharSet = 'UTF-8';

        $mail->setFrom('razao.jur@contabilrazao.com.br', 'Site Contábil Razão');
        $mail->addAddress('razao.jur@contabilrazao.com.br');
        $mail->addReplyTo($email, $nome);

        // Corpo do e-mail
        $mail->Subject = 'Novo contato pelo site';
        $mail->Body ="Nome:$nome
        E-mail: $email
        Telefone: $telefone
        Plano: $plano";

        // Envia
        $mail->send();

        // REDIRECIONA PARA A TELA DE OBRIGADO
        header("Location: /backend/obrigado/obrigado.html");
        exit();

    } catch (Exception $e) {
        // Exibe erro caso falhe
        echo 'Erro ao enviar: ' . $mail->ErrorInfo;
        exit();
    }
}

        // Se não for POST
        echo 'Requisição inválida.';
        exit();
        ?>
