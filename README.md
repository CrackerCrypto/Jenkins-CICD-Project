# Login and Sign-Up Application

## Description

This project focuses on building a CICD pipeline using Jenkins. I have used this project to automate the containerization of a node js application. Later I have deployed the application using Argo CD into a K8s cluster(minikube). Also, to setup the Jenkins server I have used Terraform and AWS CLI to built the infrastructure much more efficiently.

The project covers the core concepts of DevOps like CICD pipeline, Infrastructure as Code, Containerization etc.

P.S: This project is an extention of my Docker-And-Kubernetes Project. The difference between the project is I have also implemeted `PersistentVolume` and `PersistentVolumeClaim` that will be used to manage persistent storage in stateful applications.

## Features of the application

- User registration and login functionality
- Secure password handling and storage with encryption
- Session management
- MongoDB integration for user data storage

## Technologies Used

- **Backend**: Node.js (Express, Mongoose, JWT, Bcrypt)
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Minikube)
- **Container Registry**: DockerHub, AWS Elastic Container Registry
- **CICD Pipeline**: Jenkins
- **Infrastructure as Code**: Terraform
- **GitOps**: Argo CD
- **Others**: YAML (for Kubernetes configurations)

## Prerequisites

- Docker
- Kubernetes (Minikube)
- Terraform
- Jenkins
- Argo CD
- Node.js
- MongoDB
- AWS CLI

## Installation

Clone the Repository
Also, you need Docker Engine and Kubernetes installed on your local machine to use this project.

## Images

The image of the application is published to Docker Hub and AWS Elastic Container Registry. So that, the application can be used easily. Created a private repository in ECR to publish the image.
Docker Hub - `docker pull shybalghosh101/login-app` to pull the image.
