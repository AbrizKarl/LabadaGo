# LabadaGo: A Laundry Shop Management System

LabadaGo is a three-part system: a Spring Boot backend API, a ReactJS web
dashboard for shop staff, and an Android (Kotlin) mobile app for customers.
This repository currently contains the initial project setup and the basic
User Registration and User Login features for the web application, as
required by the Web Development Setup assignment.

## Student

Karl Andrei Abriz — IT342 G01

## Project Description

Most small laundry shops still track orders using pen and paper, which leads
to lost records, pricing mistakes, and no way for customers to check on
their laundry remotely. LabadaGo replaces that process with a shared backend
used by both a staff-facing web dashboard and a customer-facing mobile app,
so order data stays consistent everywhere.

## Tech Stack

| Layer     | Technology                               |
|-----------|-------------------------------------------|
| Backend   | Spring Boot (Java), Spring Security, JWT |
| Web App   | ReactJS                                  |
| Mobile App| Android (Kotlin)                         |
| Database  | PostgreSQL (via Supabase)                |

## Features Implemented So Far

- **User Registration** — users sign up with name, email, password, and
  role (staff or customer). Passwords are hashed with BCrypt before being
  saved.
- **User Login** — users log in with email and password. On success, the
  backend returns a JWT token which the frontend stores and uses to redirect
  the user to their dashboard.

## Running the Backend

1. Make sure you have a Supabase (PostgreSQL) project created.
2. Copy `Backend/src/main/resources/application.properties.example` to
   `application.properties` and fill in your own Supabase database URL,
   username, and password.
3. From the `Backend` folder, run: `mvn spring-boot:run`
4. The API will start on `http://localhost:8080`.

## Running the Web App

1. From the `Web` folder, run: `npm install` then `npm start`
2. The app will open at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint             | Description         |
|--------|-----------------------|----------------------|
| POST   | `/api/auth/register`  | Register a new user  |
| POST   | `/api/auth/login`     | Log in a user        |

## Development Progress Summary

For this milestone, the project environment was set up for both the Spring
Boot backend and the ReactJS frontend, following a layered
Controller–Service–Repository architecture on the backend. The User
entity and Supabase (PostgreSQL) database connection were configured, and
the core authentication features (registration and login) were implemented
end to end, including password hashing with BCrypt and JWT token generation.
On the frontend, the Registration and Login pages were built as React
functional components that communicate with the backend through fetch
calls, with client-side routing to redirect logged-in users to a role-based
dashboard. Further milestones will build out order management, the mobile
app, and expanded role-based access control.