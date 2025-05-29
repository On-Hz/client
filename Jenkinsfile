pipeline {
    agent any

    environment {
        REMOTE_USER  = "onhz"
        REMOTE_SERVER = "220.93.50.45"
        REMOTE_PORT  = "4342"
        REMOTE_PATH  = "/Users/onhz/workspace/onhz/dockers/client_docker"
    }

    stages {
        stage('Checkout') {
          steps {
            git credentialsId: 'frontend_credential', branch: 'main', url: 'https://github.com/On-Hz/client.git'
          }
        }
        stage('Install Dependencies') {
            steps {
                // 의존성 설치 및 workspaces 활성화
                sh 'yarn install --mode=update-lockfile'
                sh 'yarn workspaces focus --all'
            }
        }
        stage('Build') {
            steps {
                // 빌드 실행 (빌드 결과물이 dist 폴더에 생성됨)
                sh 'yarn run build'
            }
        }
        stage('Transfer dist to Remote Server') {
            steps {
                script {
                    // 빌드 산출물(dist)을 원격 서버의 deploy 하위에 임시 폴더(dist_new)로 전송
                    sshagent(credentials: ['onhz-macmini']) {
                        sh '''
                            echo "전송 시작: dist 폴더"
                            scp -P ${REMOTE_PORT} -o StrictHostKeyChecking=no -r dist ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_PATH}/app/dist_new
                            
                            echo "전송 시작: ecosystem.config.cjs 파일"
                            scp -P ${REMOTE_PORT} -o StrictHostKeyChecking=no ecosystem.config.cjs ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_PATH}/app/config/
                        '''
                    }
                }
            }
        }
        stage('Backup, Deploy & Reload') {
            steps {
                script {
                    sshagent(credentials: ['onhz-macmini']) {
                        sh '''
                            ssh -p ${REMOTE_PORT} -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_SERVER} << 'EOF'
                            cd /Users/onhz/workspace/onhz/dockers/client_docker/app
                            
                            # backup 폴더가 없으면 생성
                            if [ ! -d "backup" ]; then
                                mkdir -p backup
                                echo "✅ backup 폴더 생성됨"
                            fi
                            
                            # 현재 dist 폴더 백업 (타임스탬프 포함)
                            TIMESTAMP=$(date +%Y%m%d-%H%M%S)
                            if [ -d "dist" ]; then
                                cp -r dist backup/dist_backup_$TIMESTAMP
                                echo "✅ 현재 dist 폴더 백업됨: backup/dist_backup_$TIMESTAMP"
                            fi
                            
                            # 기존 dist 폴더 내용 삭제 (폴더 자체는 유지)
                            if [ -d "dist" ]; then
                                rm -rf dist/*
                            else
                                mkdir dist
                            fi
                            
                            # 새로 전송된 폴더의 내용을 기존 dist 폴더로 복사
                            cp -r dist_new/* dist/
                            
                            # 임시 폴더 삭제
                            rm -rf dist_new
                            
                            echo "✅ 새 dist 폴더 배포 완료 "
                            
                            # Docker 컨테이너 내부의 PM2 재시작 (무중단 업데이트)
                            docker-compose -f /Users/onhz/workspace/onhz/dockers/client_docker/docker-compose.yml exec client pm2 reload on-hz --update-env
                            echo "✅ PM2가 새 배포로 리로드됨"
                            EOF
                        '''
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ 배포가 성공적으로 완료되었습니다!'
        }
        failure {
            echo '❌ 배포에 실패했습니다!'
        }
    }
}
