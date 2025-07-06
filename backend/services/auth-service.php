<?php
namespace App\AuthService;
require_once(__DIR__."/users-service.php");
require_once(__DIR__ . '/../database/db.php');

use Exception;
use PDO;
use App\UserService\User;

class Auth
{
    private $bdd;
    private $id;

    public function __construct($id)
    {
        $this->bdd = database();
         $this->id = $id;
    }

    public function isAdmin()
    {

        $User = new User();

        $foundUser = $User->getById($this->id);

        if (!$foundUser) return false;

        if ($foundUser["role"] == 2) return true;
        else return false;
    }

    public function isModerator()
    {

        $User = new User();

        $foundUser = $User->getById($this->id);

        if (!$foundUser) return false;

        if ($foundUser["role"] == 1 || $foundUser["role"] == 2) return true;
        else return false;
    }
    
}


