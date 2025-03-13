module.exports = {
  apps: [{
    name: "on-hz",
    script: "serve",
    exec_mode: "cluster",  // 클러스터 모드로 실행
    instances: "max",      // 사용 가능한 모든 CPU 코어 만큼 실행
    wait_ready: true,      // 앱이 준비 완료 신호를 보낼 때까지 대기 (앱 코드에서 process.send('ready') 필요)
    listen_timeout: 5000,  // 5000ms 내에 준비 완료 신호를 받지 못하면 재시작
    env: {
      PM2_SERVE_PATH: "/app/dist",
      PM2_SERVE_PORT: 8000,
      PM2_SERVE_SPA: "true",
      PM2_SERVE_HOST: "0.0.0.0",
      NODE_ENV: "production"
    }
  }]
}