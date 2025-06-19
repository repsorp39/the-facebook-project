<?php
session_start();

require_once("../../utils/serve-json.php");
require_once("../../services/users-service.php");
require_once("../../services/email-service.php");
require("../../utils/handle-upload.php");


use App\JSON\JSON;
use App\UserService\User;
use App\EmailService\Email;


if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $email = strip_tags($_POST["email"] ??'');
        $firstname = strip_tags($_POST["firstname"] ?? '');
        $lastname = strip_tags($_POST["lastname"]?? '');
        $gender = strip_tags($_POST["gender"] ?? '');
        $birthday = $_POST["birthday"] ?? '';
        $password = $_POST["password"] ?? '';

        //check that every field is not empty
        if(empty($email) || empty($firstname) || empty($lastname) || empty($gender) || empty($birthday) || empty($password)){
            return JSON::serve(400, ["message" => "Tous les champs sont requis"]);
        }

        if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
            return JSON::serve(400, ["message" => "Email invalide"]);
        }

        //handle picture upload
        if(array_key_exists('picture',$_FILES)){
            $picture = handleUpload($_FILES["picture"],'image');
        }

        $User = new User();

        //email must be unique in the db
        $foundUser = $User->getByEmail($email);
        if($foundUser) {
            return JSON::serve(409, ["message" => "Un utilisateur avec cet email existe déjà"]);
        }

        $success = $User->create([
                "email"      => $email,
                "firstname"  => $firstname,
                "lastname"   => $lastname,
                "gender"     => $gender,
                "picture"    => $picture ?? '',
                "birthday"   => $birthday,
                "password"   => password_hash($password,PASSWORD_BCRYPT),
             ] );

        if($success){
            $status = 201;
            $response = [
                "message"=>"User saved successfully"
            ];
            $otpCode = substr(uniqid(),0,6);
            Email::sendAccountConfirmation(["firstname"=>$firstname,"email"=>$email],$otpCode);
            $_SESSION['otpcode'] = $otpCode;
        }else{
            $status = 500;
            $response = [
                "message"=>"Something broke. Try later"
            ];
        }

        JSON::serve($status,$response);
    } catch (Exception $e) {
        die($e->getMessage());
    }
}else{
    JSON::serve(405,["message"=>"Methode non autorisé"]);
}