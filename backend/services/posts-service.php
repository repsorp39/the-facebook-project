<?php

namespace App\PostService;

require_once(__DIR__ . '/../database/db.php');
require("../../services/friendship-service.php");


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
        $sql = "INSERT INTO posts (user_id, description, content, type) VALUES (:user_id, :description, :content, :type)";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([
            ':user_id' => $post['user_id'],
            ':description' => $post['description'],
            ':content' => $post['content'] ?? '',
            ':type' => $post['type'] ?? 'text'
        ]);
        return true;
    }

    public function delete(string $postid): bool
    {
        $sql = "DELETE FROM posts WHERE post_id = :post_id";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([':post_id' => $postid]);
        return true;
    }

    public function update(array $post): bool
    {
        $sql = "UPDATE posts SET description = :description, content = :content, type = :type WHERE post_id = :post_id";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([
            'description' => $post['description'],
            'content' => $post['content'] ?? '',
            'type' => $post['type'] ?? 'text',
            'post_id' => $post['post_id'],
            // 'user_id' => $post['user_id']
        ]);
        return true;
    }

    //do not forget to send with comments if it available
    public function getAll(): array
    {
        $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    ORDER BY p.post_id DESC";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        require_once __DIR__ . '/comments-service.php';
        $commentService = new \App\CommentService\Comment();
        foreach ($posts as &$post) {
            // Récupérer les likes
            $likeStmt = $this->bdd->prepare("SELECT user_id FROM `like` WHERE post_id = ?");
            $likeStmt->execute([$post['post_id']]);
            $post['likes'] = $likeStmt->fetchAll(PDO::FETCH_COLUMN);
            // Récupérer les commentaires enrichis
            $comments = $commentService->getAll($post['post_id']);
            foreach ($comments as &$comment) {
                $userStmt = $this->bdd->prepare("SELECT id, firstname, lastname, picture FROM users WHERE id = ?");
                $userStmt->execute([$comment['user_id']]);
                $comment['user'] = $userStmt->fetch(PDO::FETCH_ASSOC);
            }
            $post['comments'] = $comments;
        }
        return $posts;
    }
    
    //do not forget to send with comments if it available
    public function getLastUserPosts(string $userid): array
    {
        $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.user_id = ?
                    ORDER BY p.post_id DESC LIMIT 3";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([$userid]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        require_once __DIR__ . '/comments-service.php';
        $commentService = new \App\CommentService\Comment();
        foreach ($posts as &$post) {
            // Récupérer les likes
            $likeStmt = $this->bdd->prepare("SELECT user_id FROM `like` WHERE post_id = ?");
            $likeStmt->execute([$post['post_id']]);
            $post['likes'] = $likeStmt->fetchAll(PDO::FETCH_COLUMN);
            // Récupérer les commentaires enrichis
            $comments = $commentService->getAll($post['post_id']);
            foreach ($comments as &$comment) {
                $userStmt = $this->bdd->prepare("SELECT id, firstname, lastname, picture FROM users WHERE id = ?");
                $userStmt->execute([$comment['user_id']]);
                $comment['user'] = $userStmt->fetch(PDO::FETCH_ASSOC);
            }
            $post['comments'] = $comments;
        }
        return $posts;
    }

    public function getById(string $postid): array
    {
        $sql = "SELECT p.*, u.firstname, u.lastname, u.picture as user_picture 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.post_id = :post_id";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute(['post_id' => $postid]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($post) {
            // Récupérer les likes
            $likeStmt = $this->bdd->prepare("SELECT user_id FROM `like` WHERE post_id = ?");
            $likeStmt->execute([$post['post_id']]);
            $post['likes'] = $likeStmt->fetchAll(PDO::FETCH_COLUMN);
            // Récupérer les commentaires enrichis
            require_once __DIR__ . '/comments-service.php';
            $commentService = new \App\CommentService\Comment();
            $comments = $commentService->getAll($postid);
            foreach ($comments as &$comment) {
                $userStmt = $this->bdd->prepare("SELECT id, firstname, lastname, picture FROM users WHERE id = ?");
                $userStmt->execute([$comment['user_id']]);
                $comment['user'] = $userStmt->fetch(PDO::FETCH_ASSOC);
            }
            $post['comments'] = $comments;
        }
        return $post ? $post : [];
    }

    public function getfriendpost(string $postid): array
    {
        $sql = "SELECT p.* FROM posts WHERE p.post_id = :post_id IN(SELECT p. 
                    FROM posts p 
                    JOIN users u ON p.user_id = u.id 
                    WHERE p.post_id = :post_id)";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([':post_id' => $postid]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

        public function like($post_id, $user_id): bool
    {
        $sql = "INSERT IGNORE INTO `like` (post_id, user_id) VALUES (:post_id, :user_id)";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
        return true;
    }

    public function dislike($post_id, $user_id): bool
    {
        $sql = "DELETE FROM `like` WHERE post_id = :post_id AND user_id = :user_id";
        $stmt = $this->bdd->prepare($sql);
        $stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
        return true;
    }
}
