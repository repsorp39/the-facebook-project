<?php
namespace App\CommentService;
require_once(__DIR__ . '/../database/db.php');

use Exception;

class Comment{
    private $bdd;

    public function __construct() {
        $this->bdd = database();
    }

    public function create(array $comment)
    {
        $sql = "INSERT INTO comments (user_id,content,post_id) VALUES (:user_id,:content,:post_id)";
        $stmt = $this->bdd->prepare($sql);
        $state = $stmt->execute([
            "user_id" => $comment["user_id"],
            "content" => $comment["content"],
            "post_id" => $comment["post_id"],
        ]);
        return $state;
    }

    public function delete(string $commentid): bool
    {
        $sql = "DELETE FROM comments WHERE comment_id = ?";
        $stmt = $this->bdd->prepare($sql);
        return  $stmt->execute([$commentid]);
    }

    public function update(array $comment):bool{
        return true;
    }

    public function getById(string $commentid)
    {
        $sql = "SELECT * FROM comments WHERE comment_id = ?";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([$commentid]);
        return $stmt->fetch();
    }

    public function getAll(string $postid): array
    {
        $sql = "SELECT c.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM comments c 
                    JOIN users u ON c.user_id = u.id 
                    WHERE c.post_id = :post_id
                    ORDER BY c.comment_id DESC";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([':post_id' => $postid]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}