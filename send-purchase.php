<?php
//echo 'file send.php open';
$config = include($_SERVER['DOCUMENT_ROOT'].'/delicacies/.config.php');

    if($_POST){
        if($_POST['action'] === 'send_message'){
            parse_str($_POST['data_user'], $data_user);

            $log['date'] = date('d.m.Y H:i:s');
            $log['data'] = $data_user;

            $name = htmlspecialchars($data_user['name'], ENT_QUOTES);
            $phone = htmlspecialchars($data_user['tel'], ENT_QUOTES);
            $message = htmlspecialchars($data_user['message'], ENT_QUOTES);
            $date = htmlspecialchars($data_user['date'], ENT_QUOTES);


            $subject = "Новое обращениие на ".$_SERVER['HTTP_HOST'];
            //Устанавливаем кодировку заголовка письма и кодируем его
            $subject = "=?utf-8?B?".base64_encode($subject)."?=";

            //Составляем тело сообщения
            $message = 'Получено новое сообщение. <br/> <br/>Имя: '. $name .'<br/>Телефон: '. $phone .' <br/>Сообщение: '. $message . '<br/>Дата доставки: '. $date;

            //Составляем дополнительные заголовки для почтового сервиса mail.ru
            //Переменная $email_admin, объявлена в файле .config.php
            $email_admin = $config['support']['email'];
            $email_supervisor = $config['supervisor']['email'];

            $headers = "From: $email_admin\r\nReply-to:$email_admin\r\nContent-type: text/html; charset=utf-8\r\n";
            //Отправляем сообщение с ссылкой на страницу установки нового пароля и проверяем отправлена ли она успешно или нет.
            if(mail($email_supervisor, $subject, $message, $headers)){
                $log['state'] = 'success';
                echo 'сообщениие отправлено.';
            } else {
                $log['state'] = 'error';
                echo 'ошибка. сообщениие не отправлено.';
            }

            file_put_contents($_SERVER['DOCUMENT_ROOT'].'/delicacies/log/send_message.log', var_export($log, true), FILE_APPEND);

        }
    }

