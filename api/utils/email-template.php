<?php 
 function getAccountConfirmTemplate($fullname,$url){
    return <<<EOT
        <!DOCTYPE html>
        <html lang="fr">
        <head>
        <meta charset="UTF-8">
        <title>Confirmation Email - Let's Chat</title>
        <style>
            body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #1e1e2f;
            color: #ffffff;
            }
            .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #2a2a3d;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.4);
            }
            h1 {
            color: #00bcd4;
            text-align: center;
            margin-bottom: 20px;
            }
            p {
            font-size: 16px;
            line-height: 1.6;
            }
            .otp {
            display: inline-block;
            background-color: #111827;
            padding: 12px 24px;
            font-size: 1p7x;
            font-weight: bold;
            letter-spacing: 4px;
            color: #00bcd4;
            border-radius: 6px;
            margin: 15px auto;
            text-align: center;
            }
            .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #cccccc;
            text-align: center;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Let's Chat</h1>
            <p>Bonjour $fullname,</p>
            <p>Merci de vous être inscrit sur <strong>Let's Chat</strong> 👋</p>
            <p>Pour confirmer votre adresse e-mail, veuillez cliquer sur le lien ci-dessous et accéder à  l'application :</p>
            
            <a class="otp" href="$url">Lien de confirmation</a> 

            <p>Ce lien expirera dans 5 minutes.</p>
            <p>Si vous n’avez pas initié cette demande, vous pouvez ignorer cet e-mail.</p>

            <div class="footer">
            &copy; 2025 Let's Chat. Tous droits réservés.
            </div>
        </div>
        </body>
        </html>

    EOT;
   
}
