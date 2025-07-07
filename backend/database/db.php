<?php
$bdd = null;
function database():PDO{
    global $bdd;
    if($bdd) return $bdd;
    
    try{
        $host = 'shinkansen.proxy.rlwy.net';      // Host Railway
        $port = '59178';                          // Port Railway
        $dbname = 'railway';                      // Nom de la base Railway
        $username = 'root';                       // User Railway
        $password = 'PbEbisGsxdjaDmUZNSySHzyVNkYFqgof';   // Mot de passe Railway

        $bdd = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $bdd->exec("SET NAMES utf8mb4");
        return $bdd;
    }catch(PDOException $e){
        die($e->getMessage());
    }
}