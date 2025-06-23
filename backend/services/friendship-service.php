<?php

namespace App\FriendShipService;

use Exception;

require_once("../../database/db.php");

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
        try {
            $query = "INSERT INTO friendship (user_id1,user_id2) VALUES  (:userid1, :userid2)";
            $stmt = $this->bdd->prepare($query);
            $state = $stmt->execute([
                "userid1" => $this->userid,
                "userid2" => $id,
            ]);
            return $state;
        } catch (Exception $e) {
            return false;
        }
    }

    //accept request invitation of the user who own the id $id
    public function confirmRequestFrom(string $id): bool
    {
        try {
            $query = "UPDATE friendship SET state = 'friend' WHERE user_id1 = :user_id1 AND user_id2 = :user_id2";
            $stmt = $this->bdd->prepare($query);
            $state = $stmt->execute(
                [
                    "user_id1" => $id,
                    "user_id2" => $this->userid,
                ]
            );

            return $state;
        } catch (Exception $e) {
            echo $e->getMessage();
            return false;
        }
    }

    //reject the friendship request of the user who own the id $id
    public function reject(string $id): bool
    {
        try {
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
        } catch (Exception $e) {
            echo $e->getMessage();
            return false;
        }
    }

    //remove a user from my friendship list
    public function remove(string $id): bool
    {
        return $this->reject($id);
    }

    public function getFriendshipList()
    {
        try {
            $query = "SELECT id,firstname,lastname,picture 
            FROM users WHERE id != :id AND 
            id IN (
                SELECT user_id2  FROM friendship WHERE user_id1 = :id AND state='friend'
                UNION 
                SELECT user_id1 FROM friendship  WHERE user_id2 = :id AND state='friend'
            )";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute(["id" => $this->userid]);
            return $stmt->fetchAll();
        } catch (Exception $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public function getAllFriendRequest()
    {
        try {
            $query = "SELECT id,firstname,lastname,picture 
            FROM users WHERE id 
            IN ( SELECT user_id1  FROM friendship WHERE user_id2 = ? AND state='waiting')";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute([$this->userid]);
            return $stmt->fetchAll();
        } catch (Exception $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public function getAllPossibleRequestSent()
    {
        try {
            $query = "SELECT id,firstname,lastname,picture 
            FROM users WHERE id != :id AND 
            id NOT IN (
                SELECT user_id2 FROM friendship WHERE user_id1 = :id 
                UNION 
                SELECT user_id1 FROM friendship  WHERE user_id2 = :id 
            )";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute(["id" => $this->userid]);
            return $stmt->fetchAll();
        } catch (Exception $e) {
            echo $e->getMessage();
            return false;
        }
    }
}
