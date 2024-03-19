# Bosta - Backend Engineer Assessment

## Project Overview

This is a simple library management system to manage books and borrowers.

### Technology Stack

Our solution is crafted using cutting-edge technologies:

- **JavaScript**: Enhancing JavaScript with static typing for robustness.
- **Express**: A fast, minimalist web framework for Node.js, ensuring efficient backend operations.
- **PostgreSQL**: A SQL-relational database program.
- **Redis**: caching sytem.
- **Docker**: containerization sytem.

### System Features

The primary features of our system include:

- **Adding books**: Add a book with details like title, author, ISBN, available quantity, and shelf location.
- **Modifying Books**: Update a book’s details and delete books.
- **Search Books**: Search for a book by title, author, or ISBN.
- **Register Borrowers**: Register a borrower with details like name, email, and registered date.
- **Modifying Borrowers**: Update a borrower’s details and can delete borrowers.
- **Reservations**: A borrower can check the books they currently have. and can return a book
- **Analytics**: The system can show analytical reports of the borrowing process in a specific period and export the borrowing process data in CSV or Xlsx sheet formats e.x.

### Requirements

To get started with our system, ensure you have the following:

- **Docker**: For containerization of our application.
- **API Test Tool**: We recommend using Postman for testing our API endpoints.

### Installation Guide

Follow these steps to set up the project locally:

1. Ensure you have Docker and Docker Compose installed on your machine.
2. Clone the repository: `gh repo clone oaayoub/bosta_challenge`
3. Navigate to the project directory: `cd bosta_challenge`
4. Build the Docker image: `docker-compose build`
5. Start the containers: `docker-compose up -d`

### Docker Containers

Our application utilizes the following Docker containers:

- **Redis**: For storing structured data.
- **PostgreSQL**: Offering visualization and exploration capabilities for Elasticsearch.
- **NodeJS (Express) App**: Serving as the backbone of our system.

### API Endpoint Overview
[Swagger](https://app.swaggerhub.com/apis-docs/OAAYOUB0101/library-management_api/1.0.0#/)

### Additional Features:

## Analytics:
Implemented `/analytics` endpoint that allows users to retrieve reports for specific timeframes. Additionally, reports can be downloaded as CSV files for further I

## Security:
To safeguard against vulnerabilities, Integrated PostgreSQL parameterization. This ensures values are treated as data, not executable commands, preventing SQL injection attacks.

## Redis Integration:
Project leverages Redis caching to store frequently accessed data. This significantly reduces database load and delivers faster response times.

## Data retention (pg_cronn):
implemented scheduled tasks (Postgres cron jobs) to automatically delete user accounts that have been inactive and flagged for removal for 30 days

## Indexing:
Database Applied to optimize queries and accelerate data retrieval for specific searches.

## Test Coverage:
Used nyc module for test coverage, For usage use `npm test`
