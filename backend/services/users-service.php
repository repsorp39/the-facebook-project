<?php

namespace App\UserService;

use PDOException;

require_once(__DIR__ . '/../database/db.php');

class User
{
    private $bdd;

    public function __construct()
    {
        $this->bdd = database();
    }

    public function create(array $user): bool
    {
        $query = $this->bdd->prepare(
            "INSERT INTO users (firstname,lastname,birthday,gender,email,password,picture)
                 VALUES (:firstname,:lastname,:birthday,:gender,:email,:password,:picture)"
        );
        $serverUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http")
            . "://" . $_SERVER['HTTP_HOST'];
        $statement = $query->execute([
            "firstname" => $user["firstname"],
            "email" => $user["email"],
            "lastname" => $user["lastname"],
            "birthday" => $user["birthday"],
            "gender" => $user["gender"],
            "password" => $user["password"],
            "picture" => empty($user["picture"]) ? $serverUrl . '/upload/images/noprofile.jpg' : $user["picture"]
        ]);
        return $statement;
    }

    public function update(array $user): bool
    {
        $query = $this->bdd->prepare(
            "UPDATE users 
        SET email=:email,firstname=:firstname,lastname=:lastname,gender=:gender,
        birthday=:birthday,is_online=:is_online,picture=:picture,password=:password, 
        reset_token=:reset_token,confirmed_email=:confirmed_email
        WHERE id=:id"
        );
        $statement = $query->execute([
            "email" => $user["email"],
            "firstname" => $user["firstname"],
            "lastname" => $user["lastname"],
            "gender" => $user["gender"],
            "birthday" => $user["birthday"],
            "is_online" => $user["is_online"],
            "picture" => $user["picture"],
            "password" => $user["password"],
            "id" => $user["id"],
            "reset_token" => $user["reset_token"] ?? "",
            "confirmed_email" => $user["confirmed_email"] ?? "",

        ]);
        return $statement;
    }

    public function delete(string $id): bool
    {
        $query = $this->bdd->prepare("DELETE FROM users WHERE id = ?");
        $statement = $query->execute([$id]);
        return $statement;
    }

    public function getByEmail(string $email): array|null
    {
        $query = $this->bdd->prepare("SELECT * FROM users WHERE email = ?");
        $query->execute([$email]);
        $user = $query->fetch();
        return $user ? $user : null;
    }

    public function getById(string $id)
    {
        $query = $this->bdd->prepare("SELECT * FROM users WHERE id = ?");
        $query->execute([$id]);
        return $query->fetch() ?? null;
    }

    public function getAll(int $page = 1, int $max = 8): array
    {
        //we should send with the total numbers of page
        $totalStatement = $this->bdd->query("SELECT COUNT(*) AS total FROM users");
        $total = $totalStatement->fetch()["total"];
        $totalPages = ceil($total / $max);
        $skip = $max * ($page - 1);
        $query = $this->bdd->query("SELECT * FROM users LIMIT $skip,$max");
        $users = $query->fetchAll();

        return [
            "totalPages" => $totalPages,
            "users" => $users
        ];
    }

    public function createmoderator(string $id)
    {
        $query = $this->bdd->prepare("UPDATE users SET role = '1' WHERE id = ?");
        $statement = $query->execute([$id]);
        return $statement;
    }

    public function createadmin(string $id)
    {
        $query = $this->bdd->prepare("UPDATE users SET role = '2' WHERE id = ?");
        $statement = $query->execute([$id]);
        return $statement;
    }

    public function getAllModerators(): array
    {
        $query = $this->bdd->query("SELECT * FROM users WHERE role = '1'");
        return $query->fetchAll();
    }

    public function removeModerator(string $id): bool
    {
        $query = $this->bdd->prepare("UPDATE users SET role = '0' WHERE id = ?");
        $statement = $query->execute([$id]);
        return $statement;
    }

    public function getAllAdmins(): array
    {
        $query = $this->bdd->query("SELECT * FROM users WHERE role = '2'");
        return $query->fetchAll();
    }

    //users without admin or moderators
    public function getAllAvailableUsers(): array
    {
        $query = $this->bdd->query("SELECT * FROM users WHERE role = '0' ");
        return $query->fetchAll();
    }
}
