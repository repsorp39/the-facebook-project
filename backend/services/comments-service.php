<?php
namespace App\CommentService;
require_once("../database/db.php");

class Comment{
    private $bdd;

    public function __construct() {
        $this->bdd = database();
    }

    public function create(array $comment):bool{
        
        return true;
    }

    public function delete(string $commentid):bool{

        return true;
    }

    public function update(array $comment):bool{
        return true;
    }

    public function getAll(string $postid):array{
        try {
            $sql = "SELECT * FROM comments WHERE post_id = :post_id ORDER BY created_at ASC";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $postid]);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return [];
        }
    }
}