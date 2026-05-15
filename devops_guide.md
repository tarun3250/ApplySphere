# APEX ApplyAI - DevOps Assets

## 📦 Dockerization

### Dockerfile (Production)
```dockerfile
# Stage 1: Build Frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build Backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build-frontend /app/dist ./dist
COPY server.ts .
# In a real environment, we'd compile TS to JS
RUN npm install -g tsx
EXPOSE 3000
CMD ["tsx", "server.ts"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
      - DB_HOST=db
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=apexai
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=securepassword
    ports:
      - "5432:5432"
```

## ☸️ Kubernetes (k8s/deployment.yaml)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apex-apply-ai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: apex-apply-ai
  template:
    metadata:
      labels:
        app: apex-apply-ai
    spec:
      containers:
      - name: app
        image: your-registry/apex-apply-ai:latest
        ports:
      - containerPort: 3000
        env:
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: ai-secrets
              key: gemini-key
---
apiVersion: v1
kind: Service
metadata:
  name: apex-ai-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: apex-apply-ai
```

## 🚀 CI/CD (Jenkinsfile)
```groovy
pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "tarun/apex-apply-ai"
        KUBECONFIG = credentials('kubeconfig-prod')
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install & Lint') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build & Push Docker') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
                sh "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
            }
        }
        stage('Deploy to K8s') {
            steps {
                sh "kubectl --kubeconfig=${KUBECONFIG} apply -f k8s/deployment.yaml"
                sh "kubectl --kubeconfig=${KUBECONFIG} set image deployment/apex-apply-ai app=${DOCKER_IMAGE}:${env.BUILD_ID}"
            }
        }
    }
}
```

## 🌐 Nginx Reverse Proxy (nginx.conf)
```nginx
server {
    listen 80;
    server_name apex-apply.ai;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
