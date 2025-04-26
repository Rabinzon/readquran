# Readquran.ru

A web application for reading the Quran translation using Node.js and Express. The application provides features for searching verses, viewing chapters, and their content.

## Technology Stack

- **Node.js**: Server-side platform.
- **Express**: Web framework for routing and request handling.
- **PostgreSQL**: Relational database for data storage.
- **Docker**: Application containerization.
- **Mise**: Task runner.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Rabinzon/readquran.git
cd readquran
```

### 2. Install Dependencies

```bash
mise run install
```

### 3. Set Up the Database

Ensure Docker is installed. Start PostgreSQL

```bash
mise run docker_up
```

Database connection details:

- **User**: `postgres`
- **Password**: `postgres`
- **Database**: `read_quran_db`

### 4. Start the Application

```bash
mise run start
```

The application will be available at: [http://localhost:3000](http://localhost:3000).


## Project Structure

- **`bin/www`**: Entry point for starting the server.
- **`routes/`**: Application routes.
- **`db/`**: Database operations.
- **`docker-compose.yml`**: Docker configuration for the database.
