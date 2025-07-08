<?php
function handleUpload($file,$type){
  try{
      //handle file treatment
      if (isset($file) && $file['error'] === 0) {
        //Check if the uploaded image size do not exceed 10mo.
        if ($file['size'] > 10_000_000) {
          throw new Exception('Fichier trop volumineux. 10mo max');
        } else {
            $tempName = $file['tmp_name'];
            $fileName = time() . '_' . str_replace(" ","_",basename($file['name']));
            $destinationPath = "../../upload/$type"."s/". $fileName; //path to save the file
            if (move_uploaded_file($tempName, $destinationPath)) {
              // URL complète avec protocole, domaine et chemin
            $serverUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") 
                        . "://" . $_SERVER['HTTP_HOST']; 
           

              return $serverUrl."/upload/$type"."s/".$fileName;
            } else {
              throw new Exception("Une erreur est survenue lors du move_");
            }
        }
  } else {
    throw new Exception("Erreur lors de l'upload.");
  }
  }catch(Exception $e){
      die($e->getMessage());
  }
}
