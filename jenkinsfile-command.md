pipeline
{
    agent any
        environment{
            NAME_PROJECT = "m"
            NAME_FE = "fe" NAME_BE = "be"
            DB = "mongodb://103.77.242.64:27017/mern"
            DOCKER_NETWORK = "m-network"
            DOCKER_HUB = "haquochuu" 
            DOCKER_TAG = "latest"
        }
    stages
    {
        stage("code checkout")
        {
            steps
            {
                git branch : 'main', url : 'https://github.com/Example11981/m.git'
            }
        }
        stage("image build")
        {
            steps
            {
                sh "NAME_BE=${NAME_BE} && NAME_FE=${NAME_FE} && DB=${DB}"
                sh "whoami && pwd"
                sh "docker compose -p ${NAME_PROJECT} build --no-cache"
            }
        }
        stage("push image")
        {
            steps
            {
                sh "docker image ls" withCredentials([
                    usernamePassword(credentialsId : 'dockerhub', passwordVariable : 'p', usernameVariable : 'u')])
                {
                    sh "docker login -u ${u} -p ${p}"
                    sh "docker tag ${NAME_PROJECT}-${NAME_BE} ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_BE}:${DOCKER_TAG}"
                    sh "docker tag ${NAME_PROJECT}-${NAME_FE} ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_FE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_BE}:${DOCKER_TAG}"
                    sh "docker rmi -f ${NAME_PROJECT}-${NAME_BE}"
                    sh "docker rmi -f ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_BE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_FE}:${DOCKER_TAG}"
                    sh "docker rmi -f ${NAME_PROJECT}-${NAME_FE}"
                    sh "docker rmi -f ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_FE}:${DOCKER_TAG}"
                }
            }
        }
        stage("run image")
        {
            steps("run image")
            {
                sh "docker stop ${NAME_PROJECT}-${NAME_FE} \
                && docker rm -f ${NAME_PROJECT}-${NAME_FE} || exit 0;"

                sh "docker stop ${NAME_PROJECT}-${NAME_BE} \
                && docker rm -f ${NAME_PROJECT}-${NAME_BE} || exit 0;"

                sh "docker network rm -f ${DOCKER_NETWORK} || exit 0;"

                sh "docker network create -d bridge ${DOCKER_NETWORK} || exit 0;"

                sh "docker run --name ${NAME_PROJECT}-${NAME_BE} --network=${DOCKER_NETWORK} \
                -dp 3000:3000 ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_BE}:${DOCKER_TAG}"
                sh "docker run --name ${NAME_PROJECT}-${NAME_FE} --network=${DOCKER_NETWORK} \
                -dp 80:80 --link ${NAME_PROJECT}-${NAME_BE}:${NAME_BE} \
                ${DOCKER_HUB}/${NAME_PROJECT}-${NAME_FE}:${DOCKER_TAG}"
            }
        }
    }
}

//  <!-- tmp dummy -->

//     <!-- "start": "REACT_APP_API_URL=http://127.0.0.1:3000 PORT=4200 react-scripts start",
//     "start": "node --env-file='.env' server", -->

// run docker compose:
// docker-compose -f dev.docker-compose.yml down
// docker-compose -f dev.docker-compose.yml up -d --build

// delete cache and all things:
//  docker system prune -a git stat
