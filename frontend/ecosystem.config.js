require('dotenv').config({ path: '../.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run start',
    }
  ],
  deploy: {
    production: {
      user: process.env.USER,
      host: process.env.HOST,
      ref: 'origin/main',
      repo: process.env.REPO,
      path: process.env.FRONTEND_ENV_PATH,
      'pre-deploy-local': '',
      'post-deploy': `
        npm install &&
        npm run build &&
        pm2 restart frontend
      `,
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
