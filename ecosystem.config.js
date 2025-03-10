// ecosystem.config.js
module.exports = {
  apps: [{
    name: "on-hz",               
    script: "serve",               
    exec_mode: "cluster",
    instances: "max",
      PM2_SERVE_PATH: "./dist",
      PM2_SERVE_PORT: 6000,
      PM2_SERVE_SPA: "true",
      PM2_SERVE_HOMEPAGE: "/index.html", 
      NODE_ENV: "production",
      env: {
        NODE_ENV: "production",
        PORT: 6000
    }
  }]
}