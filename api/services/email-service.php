<?php
namespace App\EmailService;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require("../modules/PHPMailer-master/src/Exception.php");
require("../modules/PHPMailer-master/src/PHPMailer.php");
require("../modules/PHPMailer-master/src/SMTP.php");
require("../utils/email-template.php");

class Email {
    public static function sendAccountConfirmation ($user,$otpCode){
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();                                            
            $mail->Host       = 'smtp.gmail.com';                     
            $mail->SMTPAuth   = true;                                  
            $mail->Username   = 'repsorpwinner@gmail.com';                      
            $mail->Password   = 'rtqhjwhrmbhquulc';                             
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;             
            $mail->Port       = 465;                                    

            $mail->setFrom('repsorpwinner@gmail.com', "Let's chat app");
            $mail->addAddress('repsorpwinner@gmail.com'); 

            //Content
            $mail->isHTML(true);                       
            $mail->Subject = "Email confirmation";
            $mail->Body    = getAccountConfirmTemplate($user["name"],$otpCode);
            $mail->send();

        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}
