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
        $mail->Host = 'smtp.gmail.com'; // Ajustar se não usar Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'SEU_EMAIL';
        $mail->Password = 'SUA_SENHA';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // Remetente e destino
        $mail->setFrom($email, $nome);
        $mail->addAddress('razao.jur@contabilrazao.com.br');

        // Conteúdo
        $mail->isHTML(false);
        $mail->Subject = "Novo Contato pelo Site";
        $mail->Body = "
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
