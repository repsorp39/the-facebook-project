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
        return [];
    }
}