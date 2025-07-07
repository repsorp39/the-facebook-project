<?php
namespace App\EmailService;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once(__DIR__ . '/../modules/PHPMailer-master/src/Exception.php');
require_once(__DIR__ . '/../modules/PHPMailer-master/src/PHPMailer.php');
require_once(__DIR__ . '/../modules/PHPMailer-master/src/SMTP.php');
require_once(__DIR__ . '/../utils/email-template.php');

class Email {
    public static function send ($user,$secret,$type){
            $mail = new PHPMailer(true);
            $mail->isSMTP();                                            
            $mail->Host       = 'smtp.gmail.com';                     
            $mail->SMTPAuth   = true;                                  
            $mail->Username   = 'repsorpwinner@gmail.com';                      
            $mail->Password   = 'rtqhjwhrmbhquulc';                             
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;             
            $mail->Port       = 465;                                    

            $mail->setFrom('repsorpwinner@gmail.com', "Let's chat app");
            $mail->addAddress($user["email"]); 

            //Content
            $mail->isHTML(true);                       
            $mail->Subject =  $type === "confirmation" ? "Email confirmation" :"Changement de mot de passe";
            $mail->Body    = $type === "confirmation"
                     ? getAccountConfirmTemplate($user["firstname"],$secret)
                     : getPasswordResetTemplate("" ,$secret);
            $mail->send(); 
    }
}
