module.exports = {
  apps: [{
    name: "on-hz",
    script: "serve",
    args: "dist 6000 --single", // 첫번째 인자는 서빙할 폴더, 두번째는 포트, --single은 SPA 모드
    exec_mode: "cluster",
    instances: "max",
    env: {
      NODE_ENV: "production"
    }
  }]
}
