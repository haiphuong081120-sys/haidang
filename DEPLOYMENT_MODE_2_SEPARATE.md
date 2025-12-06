# Comprehensive Guide for Mode 2 (Separate Frontend/Backend Deployment)

This guide provides detailed steps for deploying applications with separate frontend and backend components using the following configurations:
- **Backend**: api.haidangmeta.com
- **Frontend**: haidangmeta.com

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Testing the Deployment](#testing-the-deployment)

## Prerequisites
Before you start, ensure that you have the following:
- A server or cloud instance for the backend (api.haidangmeta.com)
- A hosting environment for the frontend (haidangmeta.com)
- Node.js and npm installed on your local machine for building the frontend
- Docker and Docker Compose installed (if using containers)

## Backend Deployment
1. **Clone the Backend Repository**
   ```bash
   git clone https://github.com/yourusername/your-backend-repo.git
   cd your-backend-repo
   ```
2. **Set Up Environment Variables**
   Create an `.env` file and populate it with the necessary configurations for your backend services.
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Build and Run the Backend**
   ```bash
   npm run build
   npm start
   ```
5. **Verify Backend URL**
   Make sure your backend is accessible at `https://api.haidangmeta.com`.

## Frontend Deployment
1. **Clone the Frontend Repository**
   ```bash
   git clone https://github.com/yourusername/your-frontend-repo.git
   cd your-frontend-repo
   ```
2. **Set Up Environment Variables**
   Create an `.env` file and configure the API URL to point to the backend:
   ```bash
   REACT_APP_API_URL=https://api.haidangmeta.com
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Build the Frontend**
   ```bash
   npm run build
   ```
5. **Deploy the Frontend**
   Upload the contents of the `build` folder to your hosting environment (haidangmeta.com).

## Testing the Deployment
- Access the frontend at `https://haidangmeta.com` and ensure it communicates with the backend.
- Test various endpoints to confirm that the integration works correctly.

## Conclusion
Following this guide, you should have a successful deployment of your applications using separate frontend and backend hosting configurations. For any further questions, refer to the respective documentation of your deployment platform or the community forums.