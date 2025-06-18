<?php 
require("../database/db.php");

function isAuthenticated(string $token):bool{
    return false;
}

function isAdmin(string $userid):bool{

    return false;
}

function isModerator(string $userid):bool{
    return false;
}

