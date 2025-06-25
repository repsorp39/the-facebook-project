<?php
namespace App\FriendShipService;
require_once(__DIR__ . '/../database/db.php');

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
        // On suppose une table friendships avec user_id et friend_id, et un statut accepté
        $sql = "SELECT user_id2 AS friend_id FROM friendship WHERE user_id1 = :userid AND state = 'accepted'
                UNION
                SELECT user_id1 AS friend_id FROM friendship WHERE user_id2 = :userid AND state = 'accepted'";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([':userid' => $this->userid]);
        $friends = $stmt->fetchAll(\PDO::FETCH_COLUMN);
        return $friends;
    }

    public function getAllFriendRequest(){

    }


}