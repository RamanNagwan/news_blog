📰 News Blog

A full-stack news/blog web application built with Node.js, Express.js, MongoDB, Mongoose, and EJS.

The application allows users to read articles and provides an admin panel for managing articles, categories, comments, and users.

🚀 Features
👤 User Features

User registration and login

Secure password hashing

User authentication

Browse published articles

View individual articles

Comment on articles

Manage user sessions

🔐 Admin Features

Admin authentication

Dashboard

Manage articles

Create, update, and delete articles

Manage article categories

Manage comments

Approve or reject comments

Manage users

Tabulator-based data tables

Local pagination and filtering

📝 Article Management

Create articles

Edit articles

Delete articles

Assign categories

Assign authors

Publish articles

Display publication dates

💬 Comment Management

View comments

Approve comments

Reject comments

Update comment status

Delete comments

🛠️ Technologies Used
Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt

Express Validator

Frontend

EJS

HTML5

CSS3

JavaScript

Bootstrap 5

Tabulator

Font Awesome

📁 Project Structure
news_blog/
│
├── config/
│   └── database configuration
│
├── controllers/
│   └── application controllers
│
├── middleware/
│   └── authentication and validation middleware
│
├── model/
│   └── Mongoose models
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
│   └── application routes
│
├── utils/
│   └── utility functions
│
├── views/
│   ├── admin/
│   ├── auth/
│   └── frontend/
│
├── app.js
├── package.json
└── README.md

⚙️ Installation
1. Clone the repository
git clone https://github.com/RamanNagwan/news_blog.git

2. Navigate to the project
cd news_blog

3. Install dependencies
npm install

4. Configure environment variables

Create a .env file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Do not commit your .env file to GitHub.

5. Start the development server
npm run dev


The application will be available at:

http://localhost:3000

📦 Available Scripts
npm run dev


Starts the application using Nodemon during development.

npm start


Starts the application using Node.js.

🔑 Authentication

The application uses authentication to protect admin functionality.

Passwords are hashed using bcrypt, and authenticated users are handled using JWT.

Protected functionality includes:

Admin dashboard

Article management

User management

Comment management

📊 Admin Dashboard

The admin dashboard provides management interfaces for:

Articles

Categories

Users

Comments

The project uses Tabulator to display and manage tabular data with pagination.

💬 Comment Status

Comments can have different statuses:

pending
approved
rejected


Administrators can change the comment status from the admin dashboard.

🔒 Security

The project includes several security-related practices:

Password hashing with bcrypt

JWT-based authentication

Authentication middleware

Request validation

Environment variables for sensitive configuration

MongoDB/Mongoose validation

For production deployment, additional security such as rate limiting, HTTP security headers, CSRF protection where applicable, and stronger input sanitization should be considered.

📌 Future Improvements

Possible improvements include:

Image upload for articles

Rich text editor

Article search

Article pagination from the server

Tags

User profiles

Email verification

Password reset

Social sharing

Like/bookmark functionality

Improved admin dashboard statistics

API documentation

Automated tests

Production deployment

🤝 Contributing

Contributions are welcome.

Fork the repository.

Create a new branch.

git checkout -b feature/new-feature


Make your changes.

Commit your changes.

git commit -m "Add new feature"


Push the branch.

git push origin feature/new-feature


Open a Pull Request.

📄 License

This project is currently for learning and portfolio purposes.

👨‍💻 Author

Raman Nagwan

GitHub:
https://github.com/RamanNagwan