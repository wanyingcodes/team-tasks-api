# Team Task Management System

## Description

A backend system for managing team tasks, projects, and collaboration.  
It provides user authentication, project organization, task assignment, and comment-based collaboration, designed for small team workflow management.

## Features

User authentication (JWT-based)  
User management  
Project management  
Task management  
Comment management  
Integration testing support

## Roadmap

Pagination & filtering  
Global error handling & interceptors  
Dockerization  
Deployment  

## Tech Stack

TypeScript  
NestJS (Node.js)  
Prisma (ORM)  
PostgreSQL  
JWT Authentication

See [package.json](./package.json) for full dependencies.

## Getting Started

### Installation

```bash
git clone git@github.com:wanyingcodes/team-tasks-api.git
cd team-tasks-api
npm install
```

### Environment Variables

Create a .env file and configure the required variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secret-key"
PORT=3000
```

You can also copy from [.env.example](./.env.example)

### Run (Development)

```bash
npm run start:dev
```

## Testing

### Option 1: Manual Testing

Try commands in file [test_commands](./docs/test_commands.md) after starting the server.

### Option 2: Integration Test Script

```bash
# Copy script to root directory:
cp docs/test-integration.sh .

# Run test:
./test-integration.sh
```

## Architecture

This project is built on NestJS and employs a modular, layered architecture:

```text
.
├── docs/
├── prisma/
├── src/
│ ├── auth/
│ ├── user/
│ ├── project/
│ ├── task/
│ ├── comment/
│ └── main.ts
├── test/
└── ...
```

## Contact

GitHub: https://github.com/wanyingcodes  
Email: wanyingt@hotmail.com