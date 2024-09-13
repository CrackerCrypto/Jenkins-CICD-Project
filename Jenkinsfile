pipeline{
    agent any
    tools{
        jdk 'jdk'
        nodejs 'nodejs'
    }
    environment{
        SCANNER_HOME=tool 'sonar-scanner'
        DOCKER_HUB_REGISTRY='shybalghosh101/cicd-pipeline-project'
        DOCKER_HUB_CREDENTIALS='docker-cred'
    }
    stages{
        stage('Cleaning Workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout from Git'){
            steps{
                git credentialsId: 'GITHUB', branch:'main', url:'https://github.com/CrackerCrypto/Docker-And-Kubernetes-Project.git'
            }
        }
        stage('Sonarqube-Analysis'){
            steps{
                dir('app'){
                    withSonarQubeEnv('sonar-server'){
                        sh ''' $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=demo-pipeline-project \
                        -Dsonar.projectKey=demo-pipeline-project '''
                    }
                }
            }
        }
        stage('Quality Check') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'sonar' 
                }
            }
        }
        stage('Trivy File Scan'){
            steps{
                dir('app'){
                    sh 'trivy fs . > trivyfs.txt'
                }
            }
        }
        stage('Docker Image Build'){
            steps{
                sh 'docker system prune -f'
                sh 'docker container prune -f'
                sh 'docker build -t ${DOCKER_HUB_REGISTRY}:${BUILD_NUMBER} .'
            }
        }
        stage('Deploy Image'){
            steps{
                script{
                    def dockerImage = docker.image("${DOCKER_HUB_REGISTRY}:${BUILD_NUMBER}")
                    docker.withRegistry("https://hub.docker.com/", DOCKER_HUB_CREDENTIALS){
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Trivy Image Scan'){
            steps{
                sh 'trivy image ${DOCKER_HUB_REGISTRY}:${BUILD_NUMBER} > trivyimage.txt'
            }
        }
    }
}