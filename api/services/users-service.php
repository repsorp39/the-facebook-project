<?php
namespace App\UserService;
require_once("../database/db.php");

class User {
    private $bdd;

    public function __construct() {
        $this->bdd = database();
    }
    
    public function create(array $user):bool{
        $query = $this->bdd->prepare("INSERT INTO users (name,email, ...) VALUES (:name,:email,...)");
        $statement = $query->execute([
            "name"=>$user["name"],
            "email"=>$user["email"]
        ]);
        return $statement;
    }

    public function update(array $user):bool{
        $query = $this->bdd->prepare("UPDATE users SET name=:name, email=:email,... WHERE id = :id");
        $statement = $query->execute([
            "name"=>$user["name"],
            "email"=>$user["email"],
            "id"=>$user["id"],

        ]);
        return $statement;
    }

    public function delete(string $id):bool{
       $query = $this->bdd->prepare("DELETE FROM users WHERE id = ?");
       $statement = $query->execute([$id]);
       return $statement;
    }
    
    public function getByEmail(string $email):array{
       $query = $this->bdd->prepare("SELECT * FROM users WHERE email = ?");
       $query->execute([$email]);
       return $query->fetch();
    }

    public function getById(string $id):array{
       $query = $this->bdd->prepare("SELECT * FROM users WHERE id = ?");
       $query->execute([$id]);
       return $query->fetch();
    }

    public function getAll(int $page = 1,int $max = 8):array{
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
}