module.exports = {
    apps: [
      {
        name: 'on-hz', // 앱 이름
        script: 'npx', // 실행할 스크립트
        args: 'serve -s dist', // npx serve 명령어로 dist 폴더를 서빙
        cwd: '/var/jenkins_home/workspace/onhz-pipeline/client', // 실행할 디렉토리
        watch: false, // 파일 변경 시 자동으로 재시작하지 않도록 설정 (true로 설정하면 변경 감지 후 재시작됨)
        env: {
          NODE_ENV: 'production',
          PM2_HOME: '/var/jenkins_home/.pm2', // PM2 환경 변수 설정
        },
        log_file: '/var/log/on-hz.log', // 로그 파일 경로
      },
    ],
  };
  