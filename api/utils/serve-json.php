<?php
    namespace App\JSON;

    class JSON{
        public static function serve (array|string $data){
        echo json_encode($data);
    }
}