<?php
namespace App\StatService;

require_once(__DIR__ . '/../database/db.php');

use PDO;

class StatService
{
    private $bdd;

    public function __construct()
    {
        $this->bdd = database();
    }

    /**
     * Nombre total d'utilisateurs
     */
    public function getTotalUsers(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM users WHERE role = '0' ");
        return (int)$stmt->fetchColumn();
    }

    /**
     * Nombre de modérateurs
     */
    public function getTotalModerators(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM users WHERE role = '1'");
        return (int)$stmt->fetchColumn();
    }
    
    public function getTotalAdmin(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM users WHERE role = '2'");
        return (int)$stmt->fetchColumn();
    }

    /**
     * Nombre total de posts
     */
    public function getTotalPosts(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM posts");
        return (int)$stmt->fetchColumn();
    }
    /**
     * Nombre total de likes
     */
    public function getTotalLikes(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM `like` l JOIN posts p ON p.post_id = l.post_id");
        return (int)$stmt->fetchColumn();
    }
    /**
     * Nombre total de commentaires
     */
    public function getTotalComments(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM comments");
        return (int)$stmt->fetchColumn();
    }

    /**
     * Informations sur les n derniers utilisateurs enregistrés
     */
    public function getLastUsers(int $limit = 10): array
    {
        $stmt = $this->bdd->prepare("SELECT * FROM users ORDER BY id DESC LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Nombre d'utilisateurs connectés
     */
    public function getOnlineUsersCount(): int
    {
        $stmt = $this->bdd->query("SELECT COUNT(*) FROM users WHERE is_online = '1'");
        return (int)$stmt->fetchColumn();
    }

    /**
     * Méthode utilitaire pour retourner tout d'un coup
     */
    public function getStats(): array
    {
        return [
            'total_users'      => $this->getTotalUsers(),
            'total_moderators' => $this->getTotalModerators(),
            'total_admins'     => $this->getTotalAdmin(),
            'total_posts'      => $this->getTotalPosts(),
            'last_users'       => $this->getLastUsers(5),
            'online_users'     => $this->getOnlineUsersCount(),
            'total_likes'      => $this->getTotalLikes(),
            'total_comments'   => $this->getTotalComments()
        ];
    }
}