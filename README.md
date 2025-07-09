# The Facebook Project

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![PHP](https://img.shields.io/badge/Backend-PHP-informational?logo=php)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)
![Deploy](https://img.shields.io/badge/Deployed-Render-blue?logo=render)

> Une reproduction légère de Facebook pour explorer les concepts fondamentaux du développement web fullstack.

## 📝 Description

**The Facebook Project** est une application web inspirée de Facebook, développée dans le cadre d’un projet de classe. Elle propose une expérience utilisateur sociale avec les principales fonctionnalités d’un réseau social, tout en mettant en pratique les bases du développement front-end et back-end, la consommation d’API REST, et l’authentification par JWT.

Ce projet a pour but de se familiariser avec :
- le langage PHP en tant que back-end natif,
- les appels asynchrones via AJAX ,
- l’authentification sécurisée,

---

## 👥 Comptes de test

Utilise les identifiants ci-dessous pour tester l’application selon différents rôles :

| Rôle        | Email                    | Mot de passe   |
|-------------|--------------------------|----------------|
| 👑 Admin     | admin@admin.com         | 123456789       |
| 🛡️ Modérateur | moderator@moderator.com| 123456789   |
| 🙋 Utilisateur | user@user.com     | 123456789        |



## 🌐 Démo

Déploiement Render: [https://the-facebook-project.onrender.com](https://the-facebook-project.onrender.com)

Dépôt GitHub : [https://github.com/repsorp39/the-facebook-project](https://github.com/repsorp39/the-facebook-project)


# 🙌 Auteurs

- [Prosper AZA](https://github.com/repsorp39)
- [Karmel KEKE](https://github.com/SanManjiro)



--- 

# Frontend




## 🚀 Fonctionnalités principales

### 👤 Utilisateur
- Connexion, inscription, mot de passe oublié, changement de mot de passe
- Création de posts (texte, image, vidéo)
- Like, commentaire, édition et suppression de posts/commentaires (CRUD)
- Mise à jour du profil (informations, photo)
- Visualisation des profils d’autres utilisateurs
- Système d’invitations (ajouter, confirmer, refuser)
- Messagerie (texte, image, audio, vidéo, suppression de message)
- Réception d'emails pour la confirmation d’inscription

### 🛡️ Admin / Modérateur
- Interface d’administration (tableau de bord avec stats)
- Ajout / suppression de modérateurs
- Visualisation des derniers inscrits, nombre de posts, likes, commentaires, etc.
- Gestion des utilisateurs et des articles (CRUD)
- Le rôle "admin" inclut automatiquement les droits "modérateur"

---

## 📦 Prérequis
- Node.js >= 20


## 🛠️ Stack technique

### Frontend
- **React** (via Create React App)
- **React Router**
- **Axios**
- **React Hot Toast**
- **React Tooltip**
- **Lucide React**
- **React Icons**

### Styling
- **Tailwind CSS**
- **Bulma**

---

## ▶️ Lancement du projet en local

```bash
# Cloner le dépôt
git clone <https://github.com/repsorp39/the-facebook-project>
cd the-facebook-project/frontend

# Installer les dépendances
npm install

# Lancer l’application
npm run start

```

# Backend 

## 🏗️ Architecture

### Structure du Projet

```
backend/
├── auth/               # Authentification et autorisation
├── config/             # Configuration (CORS, etc.)
├── database/           # Connexion et gestion de base de données
├── modules/            # Modules externes (Firebase JWT, PHPMailer)
├── routes/             # Points d'entrée de l'API
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

## 📦 Prérequis

- PHP 8.0 ou supérieur
- MySQL 5.7 ou supérieur
- Extensions PHP requises :
  - `pdo_mysql`

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
const res = await axios.post("/users/user.create.php",formData)
```

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

-----
