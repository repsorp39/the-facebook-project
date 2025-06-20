<?php
namespace App\MessageService;
require_once("../database/db.php");

class Message{
    private $bdd;
    private $userid;

    public function __construct($userid) {
        $this->bdd = database();
        $this->userid = $userid;
    }

    public function create(array $message):bool{
        
        return true;
    }

    public function delete(string $messageid):bool{

        return true;
    }

    public function update(array $message):bool{
        return true;
    }

    //return all last message send to each contact of the actual user
    //it is the same than the homepage of messenger before clicking on the contact to see all previous message
    public function getPreview():array{
        return [];
    }

    public function getAllWithOneContact($contactid):array{
        return [];
    }

}