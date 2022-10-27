<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception; 

    require 'phpmailer/src/Exception.php'
    require 'phpmailer/src/PHPMailer.php'

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLaguange('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    // $mail->isSMTP();
    // $mail->SMTPAuth = true;
    // $mail->SMTPDebug = 0;
    // $mail->Host = 'ssl://smtp.yandex.ru';
    // $mail->Port = 465;
    // $mail->Username = 'delikatesrakitnoe@yandex.ru';
    // $mail->Password = 'Delikates#$Rakitnoe';

    $mail->setForm('delikates@yandex.ru', 'Покупатель деликатесов')
    $mail->addAddress('iversuss@yandex.ru')
    $mail->Subject = "Сообщение о деликатесах"
    

    $body = '<h1>Получено собщеине с сайтов деликатесов</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].' </p>'
    }
    if(trim(!empty($_POST['tel']))){
        $body.='<p><strong>Телефон:</strong>:</strong> '.$_POST['tel'].' </p>'
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].' </p>'
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = '$das';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>
    