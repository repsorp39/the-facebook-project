<?php

namespace App\FriendShipService;
require_once(__DIR__ . '/../database/db.php');

use Exception;

class FriendShip
{
    private $bdd;
    private $userid;

    public function __construct($userid)
    {
        $this->bdd = database();
        $this->userid = $userid;
    }

    //send a friendship request to the user who own the id $id
    public function sendRequestTo(string $id): bool
    {
        $query = "INSERT INTO friendship (user_id1,user_id2) VALUES  (:userid1, :userid2)";
        $stmt = $this->bdd->prepare($query);
        $state = $stmt->execute([
            "userid1" => $this->userid,
            "userid2" => $id,
        ]);
        return $state;
    }

    //accept request invitation of the user who own the id $id
    public function confirmRequestFrom(string $id): bool
    {
        $query = "UPDATE friendship SET state = 'friend' WHERE user_id1 = :user_id1 AND user_id2 = :user_id2";
        $stmt = $this->bdd->prepare($query);
        $state = $stmt->execute(
            [
                "user_id1" => $id,
                "user_id2" => $this->userid,
            ]
        );

        return $state;
    }

    //reject the friendship request of the user who own the id $id
    public function reject(string $id): bool
    {
        $query = "DELETE FROM friendship WHERE 
            (
                (user_id1 = :user_id1 AND user_id2 = :user_id2) 
                OR (user_id1 = :user_id2 AND user_id2 = :user_id1)
            )";
        $stmt = $this->bdd->prepare($query);
        $state = $stmt->execute(
            [
                "user_id1" => $id,
                "user_id2" => $this->userid,
            ]
        );

        return $state;
    }

    //remove a user from my friendship list
    public function remove(string $id): bool
    {
        return $this->reject($id);
    }

    public function getAllFriendRequest()
    {
        $query = "SELECT id, firstname, lastname, picture ,is_online
                      FROM users 
                      WHERE id IN (
                          SELECT user_id1  
                          FROM friendship 
                          WHERE user_id2 = ? AND state = 'waiting'
                          
                      )";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute([$this->userid]);
        return $stmt->fetchAll();
    }

    public function getAllPossibleRequestSent()
    {
        $query = "SELECT id,firstname,lastname,picture ,is_online
            FROM users WHERE id != :id AND 
            id NOT IN (
                SELECT user_id2 FROM friendship WHERE user_id1 = :id 
                UNION 
                SELECT user_id1 FROM friendship  WHERE user_id2 = :id 
                
            )";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute(["id" => $this->userid]);
        return $stmt->fetchAll();
    }

    public function getFriendshipList()
    {
        $query = "SELECT id,firstname,lastname,picture ,is_online
            FROM users WHERE id != :id AND 
            id IN (
                SELECT user_id2  FROM friendship WHERE user_id1 = :id AND state='friend'
                UNION 
                SELECT user_id1 FROM friendship  WHERE user_id2 = :id AND state='friend'
            )";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute(["id" => $this->userid]);
        return $stmt->fetchAll();
    }
}
