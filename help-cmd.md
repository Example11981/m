pipeline{
    agent any
    
    stages{
        stage("code chekout"){
            steps{
                git branch: 'main', url: 'https://github.com/Example11981/m.git'
            }
        }
        stage("image build"){
            steps{
                sh "whoami && pwd && ls"
                sh "docker compose -p m build --no-cache"
                
            }
        }
        stage("push image"){
            steps{
                sh "docker image ls"
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'p', usernameVariable: 'u')]) {
                   
                   sh "docker login -u ${u} -p ${p}"
                   sh "docker tag m-be haquochuu/m-be:latest"
                   sh "docker tag m-fe haquochuu/m-fe:latest"
                   
                   sh "docker push haquochuu/m-be:latest"
                   sh "docker push haquochuu/m-fe:latest"
                   
                   sh "docker rmi -f m-be m-fe"
                   sh "docker rmi -f haquochuu/m-be:latest"
                   sh "docker rmi -f haquochuu/m-fe:latest"
                }
            }
        }
        stage("run image"){
            steps("run image"){
                // sh "docker pull haquochuu/m-be:latest"
                // sh "docker pull haquochuu/m-fe:latest"
                
                sh "docker rm -f m-be m-fe"
                sh "docker rmi -f haquochuu/m-fe:latest haquochuu/m-be:latest"
                
                sh "docker network ls"
                sh "docker rm -f crud-network"
                sh "docker network create -d bridge crud-network"
                
                sh "docker run --name m-be --network=crud-network -dp 3000:3000 haquochuu/m-be:latest"
                sh "docker run --name m-fe --network=crud-network -dp 80:80 --link m-be:be haquochuu/m-fe:latest"

            }
        }
    }
}

    "start": "REACT_APP_API_URL=http://127.0.0.1:3000 PORT=4200 react-scripts start",
    "start": "node --env-file='.env' server",