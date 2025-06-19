<?php
function database():PDO{
    try{
        $bdd = new PDO("mysql:host=127.0.0.1;dbname=php_social_network","root","");
        $bdd -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        return $bdd;
    }catch(PDOException $e){
        die($e->getMessage());
    }
}