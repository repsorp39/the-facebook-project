<?php

//$picture is $_FILE["key"]
function handleUpload($picture){
  //handle file treatment
  if (isset($picture) && $picture['error'] === 0) {
    //Check if the uploaded image size do not exceed 5mo.
    if ($picture['size'] > 5000000) {
      throw new Exception('Fichier trop volumineux. 5mo max');
    } else {
      //check if is is really an image
      $fileExtension = pathinfo($picture['name'], PATHINFO_EXTENSION);
      $allowedExtensions = ['jpeg', 'jpg', 'png', 'webp'];

      if (!in_array($fileExtension, $allowedExtensions)) {
        throw new Exception("L'extension *" . $fileExtension . "* non autorisée");
      } else {
        $tempName = $picture['tmp_name'];
        $fileName = time() . '_' . basename($picture['name']);
        $destinationPath = '../upload/' . $fileName; //path to save the file
        if (move_uploaded_file($tempName, $destinationPath)) {
          return $destinationPath;
        } else {
          throw new Exception("Une erreur est survenue");
        }
      }
    }
  } else {
    throw new Exception("Une erreur est survenue");
  }
}
