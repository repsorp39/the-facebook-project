<?php
    namespace App\JSON;
    class JSON{
        public static function serve (int $status ,array|string $data){
            http_response_code($status);
            echo json_encode($data);
        }
}