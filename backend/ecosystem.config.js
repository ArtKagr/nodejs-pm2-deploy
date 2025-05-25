require('dotenv').config({ path: '../.env.deploy' });

const {
  USER, HOST, REPO, BACKEND_ENV_PATH,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/app.js',
    },
  ],
  deploy: {
    production: {
      user: USER,
      host: HOST,
      ref: 'origin/main',
      repo: REPO,
      path: BACKEND_ENV_PATH,
      'pre-deploy-local': '',
      'post-deploy': `
	cd source &&	
        npm install &&
        npm run build &&
        pm2 restart backend
      `,
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
