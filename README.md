
# URL Shortener Service

This project is a URL Shortener service built using **Go**, **GoFiber**, **Redis**, and **Docker**. It provides users with the ability to shorten URLs, create custom URLs, and includes advanced features like **Rate Limiting** and **Expiry** for old URLs. It also leverages Docker for containerization and deployment.

## Features

- **Shorten URLs:** Create short URLs for long links.
- **Custom URLs:** Users can create custom shortened URLs.
- **Rate Limiting:** Limits the number of URL creation requests for users.
- **Expiry:** URLs expire after a set time to save space.
- **Dockerized:** The application and Redis are containerized for easy deployment.

## Prerequisites

- Go (v1.16+)
- Docker
- Redis

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/adityagupta19/url_shortener.git
cd url_shortener
```

### 2. Build and run the project with Docker

```bash
docker-compose up --build
```
