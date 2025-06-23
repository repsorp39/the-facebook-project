<?php
namespace App\PostService;
require_once("../../database/db.php");

use Exception;
use PDO;

class Post{
    private $bdd;

    public function __construct() {
        $this->bdd = database();
    }

    public function create(array $post):bool{
        try {
            $sql = "INSERT INTO posts (user_id, description, content, type) VALUES (:user_id, :description, :content, :type)";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([
                ':user_id' => $post['user_id'],
                ':description' => $post['description'],
                ':content' => $post['content'] ?? '',
                ':type' => $post['type'] ?? 'text'
            ]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function delete(string $postid):bool{
        try {
            $sql = "DELETE FROM posts WHERE post_id = :post_id";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $postid]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function update(array $post):bool{
        try {
            $sql = "UPDATE posts SET description = :description, illustration = :illustration, type = :type WHERE post_id = :post_id AND user_id = :user_id";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([
                ':description' => $post['description'],
                ':illustration' => $post['illustration'] ?? '',
                ':type' => $post['type'] ?? 'text',
                ':post_id' => $post['post_id'],
                ':user_id' => $post['user_id']
            ]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    //do not forget to send with comments if it available
    public function getAll(string $userid):array{
        try {
            $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    ORDER BY p.post_id DESC";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return [];
        }
    }

    public function getById(string $postid):array{
        try {
            $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.post_id = :post_id";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $postid]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return [];
        }
    }
}