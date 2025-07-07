# Backend API - Réseau Social

## 📋 Description

Backend API RESTful pour une application de réseau social développée en PHP natif. Cette API fournit toutes les fonctionnalités nécessaires pour gérer les utilisateurs, les articles, les commentaires, les messages, les amitiés et l'administration.

## 🏗️ Architecture

### Structure du Projet

```
backend/
├── auth/                 # Authentification et autorisation
├── config/              # Configuration (CORS, etc.)
├── database/            # Connexion et gestion de base de données
├── modules/             # Modules externes (Firebase JWT, PHPMailer)
├── routes/              # Points d'entrée de l'API
│   ├── admin/          # Routes d'administration
│   ├── articles/       # Gestion des articles/posts
│   ├── comments/       # Gestion des commentaires
│   ├── friendship/     # Gestion des amitiés
│   ├── messages/       # Système de messagerie
│   ├── moderator/      # Routes de modération
│   └── users/          # Gestion des utilisateurs
├── services/           # Logique métier
├── upload/             # Stockage des fichiers uploadés
│   ├── audios/         # Fichiers audio
│   ├── images/         # Images
│   └── videos/         # Vidéos
└── utils/              # Utilitaires et helpers
```

## 🚀 Technologies Utilisées

- **PHP 8.0+** - Langage principal
- **MySQL** - Base de données
- **PDO** - Accès sécurisé à la base de données
- **Firebase JWT** - Gestion des tokens d'authentification
- **PHPMailer** - Envoi d'emails
- **Apache/Nginx** - Serveur web

## 📦 Prérequis

- PHP 8.0 ou supérieur
- MySQL 5.7 ou supérieur
- Serveur web (Apache/Nginx)
- Extensions PHP requises :
  - `pdo_mysql`
  - `json`
  - `fileinfo`
  - `openssl`

## 🔧 Installation

### 1. Cloner le Repository

```bash
git clone <https://github.com/repsorp39/the-facebook-project>
cd the-facebook-project/backend
```

### 2. Configuration de la Base de Données

#### Créer la Base de Données

```sql
CREATE DATABASE php_social_network CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Configuration de Connexion

Modifiez le fichier `database/db.php` selon votre configuration :

```php
// Exemple de configuration
$bdd = new PDO("mysql:host=127.0.0.1;dbname=php_social_network", "username", "password");
```

### 3. Configuration des Permissions

```bash
# Donner les permissions d'écriture au dossier upload
chmod -R 755 upload/
```

### 4. Configuration de l'Environnement

#### Variables d'Environnement (Recommandé)

Créez un fichier `.env` à la racine du backend :

```env
DB_HOST=127.0.0.1
DB_NAME=php_social_network
DB_USER=root
DB_PASS=

JWT_SECRET=your-super-secret-jwt-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🔐 Sécurité

### Mesures de Sécurité Implémentées

1. **Authentification JWT**

   - Tokens avec expiration (3 jours pour l'auth, 15 min pour confirmation)
   - Validation stricte des signatures

2. **Protection contre les Injections SQL**

   - Utilisation exclusive de PDO avec requêtes préparées
   - Validation et sanitisation des entrées

3. **Protection XSS**

   - `strip_tags()` sur toutes les entrées utilisateur
   - Validation des types de données

4. **Gestion Sécurisée des Fichiers**

   - Validation des types MIME
   - Renommage sécurisé des fichiers
   - Limitation de taille

5. **CORS Configuré**
   - Headers de sécurité appropriés
   - Gestion des credentials

### Recommandations de Sécurité

⚠️ **IMPORTANT** : Avant la mise en production, assurez-vous de :

1. Changer la clé JWT secrète (`$privateKey` dans `utils/token-handler.php`)
2. Configurer HTTPS
3. Limiter les origines CORS autorisées
4. Mettre en place un rate limiting
5. Configurer des logs de sécurité
6. Utiliser des variables d'environnement pour les secrets

## 📚 API Endpoints

### Authentification

- `POST /routes/users/user.create.php` - Créer un compte
- `POST /routes/users/user.login.php` - Connexion
- `POST /routes/users/user.logout.php` - Déconnexion
- `POST /routes/users/user.confirm-email.php` - Confirmer email
- `POST /routes/users/user.forgot-password.php` - Mot de passe oublié
- `POST /routes/users/user.reset-code.php` - Réinitialiser le mot de passe

### Utilisateurs

- `GET /routes/users/user.get.php` - Récupérer un utilisateur
- `PUT /routes/users/user.update.php` - Mettre à jour un profil
- `PUT /routes/users/user.change-pass.php` - Changer le mot de passe

### Articles

- `GET /routes/articles/article.get.php` - Récupérer les articles
- `POST /routes/articles/article.create.php` - Créer un article
- `PUT /routes/articles/article.update.php` - Modifier un article
- `DELETE /routes/articles/article.delete.php` - Supprimer un article
- `POST /routes/articles/article.like.php` - Liker un article

### Commentaires

- `POST /routes/comments/comments.create.php` - Créer un commentaire
- `DELETE /routes/comments/comments.delete.php` - Supprimer un commentaire

### Amitiés

- `POST /routes/friendship/friendship-send.php` - Envoyer une demande d'ami
- `POST /routes/friendship/friendship-confirm.php` - Accepter une demande
- `POST /routes/friendship/friendship-reject.php` - Refuser une demande
- `GET /routes/friendship/friendship-get-all.php` - Liste des amis
- `GET /routes/friendship/friendship-waiting-request.php` - Demandes en attente

### Messages

- `GET /routes/messages/message.get.php` - Récupérer les messages
- `POST /routes/messages/message.create.php` - Envoyer un message
- `PUT /routes/messages/message.update.php` - Modifier un message
- `DELETE /routes/messages/message.delete.php` - Supprimer un message

### Administration

- `GET /routes/admin/get.admin.php` - Statistiques admin
- `POST /routes/admin/admin.create.php` - Créer un admin
- `DELETE /routes/admin/admin.delete.php` - Supprimer un admin

### Modération

- `GET /routes/moderator/users.get.php` - Liste des utilisateurs
- `DELETE /routes/moderator/user-delete.php` - Supprimer un utilisateur
- `GET /routes/articles/Moderator/article.get.php` - Articles pour modération
- `DELETE /routes/articles/Moderator/article.delete.php` - Supprimer article (modo)

## 🔧 Utilisation

### Exemple de Requête

```javascript
// Créer un utilisateur
const formData = new FormData();
formData.append("email", "user@example.com");
formData.append("firstname", "John");
formData.append("lastname", "Doe");
formData.append("gender", "male");
formData.append("birthday", "1990-01-01");
formData.append("password", "securePassword123");
formData.append("picture", fileInput.files[0]);

fetch("/backend/routes/users/user.create.php", {
  method: "POST",
  body: formData,
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Authentification

```javascript
// Login
const formData = new FormData();
formData.append("email", "user@example.com");
formData.append("password", "password");

fetch("/backend/routes/users/user.login.php", {
  method: "POST",
  body: formData,
})
  .then((response) => response.json())
  .then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  });
```

### Requêtes Authentifiées

```javascript
// Exemple avec token
fetch("/backend/routes/users/user.get.php", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## 🧪 Tests

### Tests Unitaires Recommandés

Créez un dossier `tests/` et implémentez les tests suivants :

```php
// Exemple de test avec PHPUnit
class UserServiceTest extends TestCase
{
    public function testUserCreation()
    {
        $userService = new User();
        $userData = [
            'email' => 'test@example.com',
            'firstname' => 'Test',
            'lastname' => 'User',
            'gender' => 'male',
            'birthday' => '1990-01-01',
            'password' => password_hash('password', PASSWORD_BCRYPT)
        ];

        $result = $userService->create($userData);
        $this->assertTrue($result);
    }
}
```

### Tests de Sécurité

1. **Tests d'Injection SQL**
2. **Tests XSS**
3. **Tests d'Authentification**
4. **Tests de Validation des Fichiers**
5. **Tests de Rate Limiting**

## 📊 Performance

### Optimisations Implémentées

1. **Requêtes Préparées** - Protection contre les injections SQL
2. **Gestion des Connexions** - Pool de connexions PDO
3. **Validation Côté Serveur** - Réduction des requêtes inutiles
4. **Gestion des Fichiers** - Upload optimisé

### Recommandations d'Amélioration

1. **Mise en Cache**

   - Implémenter Redis pour le cache
   - Cache des requêtes fréquentes

2. **Optimisation Base de Données**

   - Index sur les colonnes fréquemment utilisées
   - Pagination des résultats

3. **CDN**
   - Utiliser un CDN pour les fichiers statiques
   - Compression des images

## 🐛 Débogage

### Logs Recommandés

```php
// Exemple de logging
error_log("User login attempt: " . $email . " - " . date('Y-m-d H:i:s'));
```

### Outils de Débogage

1. **Xdebug** - Débogage PHP
2. **MySQL Slow Query Log** - Optimisation des requêtes
3. **Apache/Nginx Access Logs** - Monitoring des requêtes

## 📈 Monitoring

### Métriques à Surveiller

1. **Performance**

   - Temps de réponse des API
   - Utilisation CPU/Mémoire
   - Nombre de requêtes par seconde

2. **Sécurité**

   - Tentatives de connexion échouées
   - Requêtes suspectes
   - Erreurs 4xx/5xx

3. **Base de Données**
   - Temps d'exécution des requêtes
   - Connexions actives
   - Espace disque

## 🤝 Contribution

### Standards de Code

1. **PSR-12** - Standards de codage PHP
2. **Noms Explicites** - Variables et fonctions claires
3. **Commentaires** - Expliquer le "pourquoi", pas le "comment"
4. **Tests** - Couverture minimale de 80%

### Processus de Contribution

1. Fork du projet
2. Créer une branche feature
3. Implémenter les changements
4. Ajouter les tests
5. Soumettre une Pull Request

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

## 🆘 Support

### Problèmes Courants

1. **Erreur de Connexion Base de Données**

   - Vérifier les paramètres de connexion
   - S'assurer que MySQL est démarré

2. **Erreur d'Upload de Fichier**

   - Vérifier les permissions du dossier upload/
   - Vérifier la taille maximale autorisée

3. **Erreur JWT**
   - Vérifier la clé secrète
   - Vérifier l'expiration du token

### Contact

Pour toute question ou problème :

- Créer une issue sur GitHub
- Contacter l'équipe de développement

## 🔄 Changelog

### Version 1.0.0

- ✅ Authentification JWT
- ✅ Gestion des utilisateurs
- ✅ Système d'articles
- ✅ Système de commentaires
- ✅ Système d'amitiés
- ✅ Messagerie
- ✅ Administration et modération
- ✅ Upload de fichiers
- ✅ Envoi d'emails

---

**Note** : Ce README est un document vivant qui doit être mis à jour à chaque modification importante de l'API.

---

## Connexion à la base de données Railway via phpMyAdmin

Pour accéder à votre base de données Railway depuis phpMyAdmin local :

1. **Ouvrez le fichier de configuration de phpMyAdmin**
   - Chemin : `C:/xampp/phpMyAdmin/config.inc.php`
2. **Ajoutez ce bloc à la fin du fichier** (avant le dernier `?>` s'il existe) :

```php
/* Railway DB */
$i++;
$cfg['Servers'][$i]['host'] = '';
$cfg['Servers'][$i]['port'] = '';
$cfg['Servers'][$i]['user'] = '';
$cfg['Servers'][$i]['password'] = '';
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['verbose'] = 'Railway';
$cfg['Servers'][$i]['AllowNoPassword'] = false;
```

3. **Redémarrez phpMyAdmin** et sélectionnez le serveur Railway dans l'interface.

> ⚠️ Certaines bases Railway peuvent refuser les connexions distantes. Utilisez un client comme DBeaver si besoin.

---

## Structure SQL de la table `messages`

```sql
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` enum('text','image','video','audio') NOT NULL DEFAULT 'text',
  `sendAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `edited` int(11) NOT NULL DEFAULT 0,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

---
