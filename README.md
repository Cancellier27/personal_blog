<h3 align="center">
    <b>Personal Blog</b> 
</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/filipe-cancellier-da-costa-8459ab160/">
    <img alt="Made by Filipe" src="https://img.shields.io/badge/made%20by-Filipe-brightgreen">
  </a>

  <img alt="GitHub language count" src="https://img.shields.io/badge/languages-6-brightgreen">
</p>

## 🖥️ Full Stack News Website


This is a full-stack personal blog app built from scratch, inspired by <a href="https://www.ign.com/uk" >IGN website</a>, the backend is powered by Node.js and Express with a PostgreSQL database, and the frontend is built using ReactJS with Axios for API calls and Bootstrap for styling. It allows users to read posts and manage blog content through an admin interface.

It was developed as a learning project to connect frontend and backend skills and practice CRUD operations with a real database. I used my passion for games to developed it, so the result is a news blog focused on video games news.


<h1 align="center">
<img alt="GitHub language count" src="/websiteTemplate.png">
</h1>

## 🚀 Tech Stack

**Frontend:**

- [ReactJS](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## 🔧 How to Run

1. Clone the repository:

```bash
git clone https://github.com/Cancellier27/personal_blog
```

2. Install dependencies:
```bash
npm install
```

3. Install PostgreSQL
If PostgreSQL is not installed, download and install it from:
👉 https://www.postgresql.org/download/

4. Create a new PostgreSQL database
Access PostgreSQL using your terminal or a GUI like pgAdmin and create a new database. Example using psql:
```bash
psql -U your_username
CREATE DATABASE <databse_name>;
\c <databse_name>
```

5. Create tables called "users" and "news" in the database:

```bash
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) UNIQUE NOT NULL,
    is_logged BOOLEAN NOT NULL,
    is_admin BOOLEAN NOT NULL,
    password_hash VARCHAR(100) NOT NULL
);

CREATE TABLE news (
    news_id SERIAL PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    card_title VARCHAR(150) NOT NULL,
    card_description TEXT NOT NULL,
    card_img TEXT,
    card_img_alt TEXT,
    news_title VARCHAR(150) NOT NULL,
    news_description TEXT NOT NULL,
    news_img TEXT,
    news_img_alt TEXT,
    fk_user_id INTEGER REFERENCES users(user_id),
    publish_date VARCHAR(10) NOT NULL
);
```

6. Create a .env file inside the backend/ folder with your database connection details:
```bash
PORT = <PORT_NUMBER>
DB_USER = <USER_NAME>
DB_HOST = <HOST_NAME>
DB_NAME = <DATABASE_NAME>
DB_PASS = <PASSWORD>
DB_PORT = <DB_PORT>
```

7. Run backend and frontend scripts:

Backend
```bash
cd backend/
npm start
```

Frontend
```bash
cd frontend/
npm start
```




<h1 align="center">
<img alt="GitHub language count" src="/loading.gif">
</h1>

