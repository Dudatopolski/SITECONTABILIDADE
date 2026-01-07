<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Carregar PHPMailer
require '../phpmailer/Exception.php';
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';

if (!empty($_POST['nome']) && !empty($_POST['email']) && !empty($_POST['celular'])) {

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $celular = $_POST['celular'];
    $cidade = $_POST['cidade'] ?? '';
    $atividade = $_POST['atividade'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // CONFIG SMTP
        $mail->isSMTP();
        $mail->Host = 'smtpout.secureserver.net';
        $mail->SMTPAuth = true;
        $mail->Username = 'razao.jur@contabilrazao.com.br';  // SEU EMAIL
        $mail->Password = 'SENHA_DE_APP';                    // SUA SENHA DE APLICATIVO
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // REMETENTE (seu e-mail, mas aparece o nome do cliente)
        $mail->setFrom('razao.jur@contabilrazao.com.br', $nome);

        // RECEBEDOR
        $mail->addAddress('razao.jur@contabilrazao.com.br');

        // QUANDO VOCÊ CLICAR “RESPONDER”
        $mail->addReplyTo($email, $nome);

        // Conteúdo
        $mail->isHTML(false);
        $mail->Subject = "Novo Contato pelo Site";
        $mail->Body ="
        Nome: $nome
        Email: $email
        Celular: $celular
        Cidade: $cidade
        Atividade: $atividade
        ";

        $mail->send();
        header("Location: ../obrigado.html");
        exit;
    } catch (Exception $e) {
        echo "Erro ao enviar: {$mail->ErrorInfo}";
    }
} else {
    echo "Campos obrigatórios faltando.";
}
?>
