<?php
namespace App\PostService;
require_once("../database/db.php");

class Post{
    private $bdd;

    public function __construct() {
        $this->bdd = database();
    }

    public function create(array $post):bool{
        
        return true;
    }

    public function delete(string $postid):bool{

        return true;
    }

    public function update(array $post):bool{
        return true;
    }

    //do not forget to send with comments if it available
    public function getAll(string $userid):array{
        return [];
    }
}