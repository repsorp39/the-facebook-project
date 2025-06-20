<?php
namespace App\FriendShipService;
require_once("../database/db.php");

class FriendShip{
    private $bdd;
    private $userid;

    public function __construct($userid) {
        $this->bdd = database();
        $this->userid = $userid;
    }

    //send a friendship request to the user who own the id $id
    public function sendRequestTo(string $id):bool{
        
        return true;
    }

    //accept request invitation of the user who own the id $id
    public function confirmRequestFrom(string $id):bool{

        return true;
    }

    //reject the friendship request of the user who own the id $id
    public function reject(string $id):bool{
        return true;
    }

    //remove a user from my friendship list
    public function remove(string $id):bool{
        return true;
    }

    public function getFriendshipList(){

    }

    public function getAllFriendRequest(){

    }


}