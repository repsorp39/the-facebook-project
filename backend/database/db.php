<?php
$bdd = null;
function database():PDO{
    global $bdd;
    if($bdd) return $bdd;
    
    try{
        // .env normalement mais pour des modifications futures sera pris en compte
        $host = 'shinkansen.proxy.rlwy.net';      // Host Railway
        $port = '59178';                          // Port Railway
        $dbname = 'railway';                      // Nom de la base Railway
        $username = 'root';                       // User Railway
        $password = 'PbEbisGsxdjaDmUZNSySHzyVNkYFqgof';   

        $bdd = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $bdd->exec("SET NAMES utf8mb4");
        $bdd->exec("SET time_zone = '+01:00'");
        return $bdd;
    }catch(PDOException $e){
        die($e->getMessage());
    }
}