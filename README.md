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
2. Clone the repository: `git clone `
3. Navigate to the project directory: `cd BOSTA_CHALLENGE`
4. Build the Docker image: `docker-compose build`
5. Start the containers: `docker-compose up -d`


### Docker Containers

Our application utilizes the following Docker containers:

- **Redis**: For storing structured data.
- **PostgreSQL**: Offering visualization and exploration capabilities for Elasticsearch.
- **NodeJS (Express) App**: Serving as the backbone of our system.

### API Endpoint Overview
## Books
We've designed intuitive endpoints for seamless interaction with our system:

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/books`                             | Retrieve all posts.                      |
| `POST`   | `/books`                             | Create a new post.                       |
| `DELETE`    | `/books`                          | Retrieve post #28.                       |
| `PUT`  | `/books`                          | Update data in post #28.                 |
| `POST`   | `/api/posts/28/comments`                 | Add comment to post #28.                 |
| `GET`    | `/api/posts/28/comments?status=approved&limit=10&page=4` | Retrieve page 4 of the comments for post #28 which are approved, with 10 comments per page. |
| `DELETE` | `/api/posts/28/comments/1987` or `/api/comments/1987` | Delete comment #1987.                    |
| `GET`    | `/api/users?active=true&sort=username&direction=asc&search=nodes` | Search for "nodes" in active users, sorted  by username ascendingly. |

### Additional Feature: Redis Integration

In addition to the core components mentioned above, our project also incorporates Redis. Redis serves as a key-value store, enhancing the performance and efficiency of our system. This integration is particularly beneficial for our library management system, ensuring swift and reliable access to critical data.

With our robust architecture and innovative features, we're poised to revolutionize the landscape of online conversation analysis. Let's delve into the possibilities together!
