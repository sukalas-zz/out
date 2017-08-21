<?php
	require 'phpmailer/PHPMailerAutoload.php';

	//Istance of Emailer
	$mail = new PHPMailer();

	//Set where we are sending email
	$mail->addAdress('pyrofasma@gmail.com', 'Pyrofasma I.K.E.');
	$mail->addAdress('litridis@gmail.com', 'Pyrofasma Technical Support');

	//Set who is sending the email
	$mail->setFrom('litridis@gmail.com', 'me testing dis shisa');

	//Set subject
	$mail->Subject = 'Test email';

	//Write email
	$mail->Body = 'this is our email body';

	//Send an email
	if(!$mail->send()){
		echo "error";
	}
	else{
		echo "Message sent :-)"
	}
?>