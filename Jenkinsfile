pipeline {
    agent any
    environment {
        DOCKER_IMAGE_FRONTEND = "tarun/applysphere-frontend"
        DOCKER_IMAGE_BACKEND = "tarun/applysphere-backend"
        KUBECONFIG = credentials('kubeconfig-prod')
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build & Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        stage('Build & Push Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID} ./frontend"
                sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${env.BUILD_ID} ./backend"
                sh "docker push ${DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID}"
                sh "docker push ${DOCKER_IMAGE_BACKEND}:${env.BUILD_ID}"
            }
        }
        stage('Deploy to K8s') {
            steps {
                sh "kubectl --kubeconfig=${KUBECONFIG} apply -f k8s/applysphere.yaml"
                sh "kubectl --kubeconfig=${KUBECONFIG} set image deployment/applysphere-frontend frontend=${DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID}"
                sh "kubectl --kubeconfig=${KUBECONFIG} set image deployment/applysphere-backend backend=${DOCKER_IMAGE_BACKEND}:${env.BUILD_ID}"
            }
        }
    }
}
