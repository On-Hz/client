module.exports = {
  apps: [{
    name: "on-hz",
    script: "serve",
    env: {
      PM2_SERVE_PATH: "/app/dist",
      PM2_SERVE_PORT: 8000,
      PM2_SERVE_SPA: "true",
      PM2_SERVE_HOST: "0.0.0.0"  // 모든 인터페이스에서 바인딩
    }
  }]
}