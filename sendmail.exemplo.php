<?php
require_once('php/PHPMailer.php');
require_once('php/SMTP.php');
require_once('php/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
	$mail->SMTPDebug = SMTP::DEBUG_SERVER;
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'exemplo@gmail.com';
	$mail->Password = '123456';
	$mail->Port = 587;

	$mail->setFrom('exemplo@gmail.com');
	$mail->addAddress('exemplo@gmail.com');
    $mail->addAddress('exemplo@gmail.com');

	$mail->isHTML(true);
	$mail->Subject = 'Teste - Front End Jr - Landing Page Bootcamp Unisuam';
	$mail->Body = '
    Chegou o email teste do Canal TI.
        ';
	$mail->AltBody = 'Teste - Front End Jr - Landing Page Bootcamp Unisuam';

	if($mail->send()) {
		echo 'Email enviado com sucesso';
	} else {
		echo 'Email nao enviado';
	}
} catch (Exception $e) {
	echo "Erro ao enviar mensagem: {$mail->ErrorInfo}";
}