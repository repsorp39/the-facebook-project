<?php

namespace App\PostService;

require_once(__DIR__ . '/../database/db.php');

use Exception;
use PDO;

class Post
{
    private $bdd;

    public function __construct()
    {
        $this->bdd = database();
    }

    public function create(array $post): bool
    {
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

    public function delete(string $postid): bool
    {
        try {
            $sql = "DELETE FROM posts WHERE post_id = :post_id";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $postid]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function update(array $post): bool
    {
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
    public function getAll(string $userid): array
    {
        try {
            $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    ORDER BY p.post_id DESC";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute();
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // Ajout des commentaires pour chaque post
            require_once __DIR__ . '/comments-service.php';
            $commentService = new \App\CommentService\Comment();
            foreach ($posts as &$post) {
                $post['comments'] = $commentService->getAll($post['post_id']);
            }
            return $posts;
        } catch (Exception $e) {
            return [];
        }
    }

    public function getById(string $postid): array
    {
        try {
            $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.post_id = :post_id";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $postid]);
            $post = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($post) {
                require_once __DIR__ . '/comments-service.php';
                $commentService = new \App\CommentService\Comment();
                $post['comments'] = $commentService->getAll($postid);
            }
            return $post ? $post : [];
        } catch (Exception $e) {
            return [];
        }
    }

    public function getfriendpost(string $postid): array
    {
        try {
            $sql = "SELECT p.* FROM posts WHERE p.post_id = :post_id IN(SELECT p. 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.post_id = :post_id)";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $postid]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return [];
        }
    }

    public function getFriendsPosts(string $userid): array
    {
        try {
            require_once __DIR__ . '/friendship-service.php';
            $friendshipService = new \App\FriendShipService\FriendShip($userid);
            $friends = $friendshipService->getFriendshipList();
            if (empty($friends)) {
                return [];
            }
            // Préparer la liste des ids pour la requête SQL
            $in  = str_repeat('?,', count($friends) - 1) . '?';
            $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.user_id IN ($in)
                    ORDER BY p.post_id DESC";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute($friends);
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // Ajout des commentaires pour chaque post
            require_once __DIR__ . '/comments-service.php';
            $commentService = new \App\CommentService\Comment();
            foreach ($posts as &$post) {
                $post['comments'] = $commentService->getAll($post['post_id']);
            }
            return $posts;
        } catch (Exception $e) {
            return [];
        }
    }

    public function like($post_id, $user_id): bool
    {
        try {
            $sql = "INSERT IGNORE INTO `like` (post_id, user_id) VALUES (:post_id, :user_id)";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function dislike($post_id, $user_id): bool
    {
        try {
            $sql = "DELETE FROM `like` WHERE post_id = :post_id AND user_id = :user_id";
            $stmt = $this->bdd->prepare($sql);
            $stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
