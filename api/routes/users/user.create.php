<?php
use App\JSON\JSON;
use App\UserService\User;

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $email = strip_tags($_POST["email"]);
        $name = strip_tags($_POST["name"]);
        //....

        //validate data 

        //check that it is an email
        //....
           
        $User = new User();
        $success = $User->create([
                "email" => $email,
                "name" => $name,
                // "..." => ...,
             ] );

        if($success){
            $status = 201;
            $response = [
                "message"=>"User saved successfully"
            ];
        }else{
            $status = 500;
            $response = [
                "message"=>"Something broke. Try later"
            ];
        }
        http_response_code($status);
        JSON::serve($response);
    } catch (Exception $e) {
        die($e->getMessage());
    }

}