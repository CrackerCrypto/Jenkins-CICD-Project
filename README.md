# Login and Sign-Up Application

## Description

This is a simple Node.js-based application that provides user authentication functionalities such as login and sign-up. The application uses MongoDB for data storage, and it is containerized with Docker for easy deployment. The app is deployed in a local Kubernetes cluster using Minikube, providing a scalable and cloud-native environment.

## Features

- User registration and login functionality
- Secure password handling and storage with encryption
- Session management
- MongoDB integration for user data storage
- Containerization using Docker for consistent deployment
- Local deployment on a Kubernetes cluster with Minikube

## Technologies Used

- **Backend**: Node.js (Express, Mongoose, JWT, Bcrypt)
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Minikube)
- **Container Registry**: DockerHub, AWS Elastic Container Registry
- **Others**: YAML (for Kubernetes configurations)

## Prerequisites

- Docker
- Kubernetes (Minikube)
- Node.js
- MongoDB

## Installation

Clone the Repository
Also, you need Docker Engine and Kubernetes installed on your local machine to use this project.

## Images

The image of the application is published to Docker Hub and AWS Elastic Container Registry. So that, the application can be used easily. Created a private repository in ECR to publish the image.
Docker Hub - `docker pull shybalghosh101/login-app` to pull the image.
