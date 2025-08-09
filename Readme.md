# Backend API for Authentication & User Management

This backend project is a RESTful API built with Node.js and Express, providing user authentication (signup/login) and user management functionalities. It uses JWT for token-based authentication and includes proper validation and logging.

---

## Table of Contents

- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [API Endpoints](#api-endpoints)  
- [Project Structure](#project-structure)  
- [Technologies Used](#technologies-used)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- User Signup with input validation and duplicate email check  
- User Login with JWT token generation  
- Protected routes with JWT token verification (can be extended)  
- Centralized logging for requests and errors  
- Consistent API response format for success and error  
- Password minimum length validation and email format validation  

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- npm (comes with Node.js)  
- MongoDB or another database (adjust your `User` model accordingly)  

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-backend-repo-url>
cd <your-backend-folder>



<!-- logger.info(`POST /api/users - New user data: ${JSON.stringify(req.body)}`);
logger.info('GET /api/users - Fetch all users');
return success(res, "Fetched All Users", { users });        
return error(res, "Signup failed", 500); -->


