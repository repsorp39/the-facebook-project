<?php
namespace App\MessageService;
require_once("../../database/db.php");

use Exception;

class Message{
    private $bdd;
    private $userid;

    public function __construct($userid) {
        $this->bdd = database();
        $this->userid = $userid;
    }

    public function create(array $message)
    {
        $query = "INSERT INTO messages (user_id1,user_id2,content,type,description) VALUES  (:userid1, :userid2, :content,:type,:description)";
        $stmt = $this->bdd->prepare($query);
        $state = $stmt->execute(
            [
                "userid1" => $this->userid,
                "userid2" => $message["id"],
                "content" => $message["content"],
                "type" => $message["type"],
                "description" => $message["description"],
            ]
        );
        return $state;
    }

    public function delete(string $messageid)
    {
        $query = "UPDATE messages SET description = NULL, content = NULL, deleted = 1 WHERE id = ?";
        $stmt = $this->bdd->prepare($query);
        $state = $stmt->execute([$messageid]);
        return $state;
    }

    public function update(string $messageid, string $content)
    {
        $sql = "UPDATE messages SET content = :content,edited=1 WHERE id = :id";
        $stmt = $this->bdd->prepare($sql);
        $state = $stmt->execute([
            ':content' => $content,
            ':id' => $messageid
        ]);
        return $state;
    }

    //return all last message sent to each contact of the actual user
    //it is the same than the homepage of messenger before clicking on the contact to see all previous message
    public function getPreview()
    {
        //on récupère tous les utilisateurs avec lesquels il a déjà échangé
        $sql = "SELECT id,picture,firstname,lastname FROM users WHERE id != :userid AND id IN (SELECT user_id1 FROM messages WHERE user_id2 = :userid UNION SELECT user_id2 FROM messages WHERE user_id1 = :userid)";
        $query = $this->bdd->prepare($sql);
        $query->execute(["userid" => $this->userid]);
        $friends = $query->fetchAll();
        $messages = [];
        //on récupère le dernier message avec chaque ami
        foreach ($friends as $friend) {
            $sql = "SELECT * FROM messages WHERE (user_id1 = :user1 AND user_id2 = :user2) OR (user_id1 = :user2 AND user_id2 = :user1) ORDER BY id  DESC LIMIT 1";
            $query = $this->bdd->prepare($sql);
            $params =  [
                "user1" => $this->userid,
                "user2" => $friend[0]
            ];
            $query->execute($params);
            $res = $query->fetch();
            $res["picture"] = $friend["picture"];
            $res["firstname"] = $friend["firstname"];
            $res["lastname"] = $friend["lastname"];
            $messages[] = $res;
        }

        return $messages;
    }

    public function getAllWithOneContact($contactid)
    {
        $sql = "SELECT * FROM messages WHERE
            (user_id1 = :user_id1 AND user_id2 = :user_id2) 
            OR (user_id1 = :user_id2 AND user_id2 = :user_id1) ";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([
            "user_id1" => $this->userid,
            "user_id2" => $contactid
        ]);
        return $stmt->fetchAll();
    }

}