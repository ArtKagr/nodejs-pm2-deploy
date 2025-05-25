require('dotenv').config({ path: '../.env.deploy' });

const {
  USER, HOST, REPO, DEPLOY_PATH,
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
      path: DEPLOY_PATH,
'pre-deploy': 'echo ">>> PRE DEPLOY"',
'post-deploy': `
  echo ">>> POST DEPLOY STARTED" &&
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
