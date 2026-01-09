<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Carregar PHPMailer
require '../phpmailer/Exception.php';
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';

if (!empty($_POST['nome']) && !empty($_POST['email']) && !empty($_POST['telefone'])) {

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $plano = $_POST['plano'] ?? '';

    $mail = new PHPMailer(true);
    
    try {
        // CONFIG SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'razao.jur@contabilrazao.com.br';  // SEU EMAIL
        $mail->Password = 'SENHA_DE_APP';                    // SUA SENHA DE APLICATIVO
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

         // REMETENTE (e-mail seu, nome do cliente)
        $mail->setFrom('razao.jur@contabilrazao.com.br', $nome);

        // RECEBEDOR
        $mail->addAddress('razao.jur@contabilrazao.com.br');

        // REPLY TO (para responder ao cliente)
        $mail->addReplyTo($email, $nome);


        // Conteúdo
        $mail->isHTML(false);
        $mail->Subject = "Novo contato pelo site";
        $mail->Body = "
        Novo formulário recebido:
        Nome: $nome
        E-mail: $email
        Telefone: $telefone
        Plano: $plano ";

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