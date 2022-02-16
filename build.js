const path = require('path');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const join = (name) => path.join(__dirname, name);

const copyFiles = async (dir, list) => {
  return await Promise.all(
    list.map(async (file) => {
      const originFile = join(`./${dir}/${file}`);
      if (!fs.existsSync(originFile)) return;
      return await fs.copy(originFile, join(`./dist/${dir}/${file}`));
    }),
  );
};

const buildServer = () => {
  try {
    rimraf(join('./dist/server'), async () => {
      const list = ['dist', 'pm2-app.json', 'package.json', 'package-lock.json'];
      await copyFiles('server', list);
      console.log(`buildServer success!`);
    });
  } catch (err) {
    console.log('build failed: \n' + err);
  }
};

const buildClient = () => {
  try {
    rimraf(join('./dist/client'), async () => {
      const list = [
        'dist',
        'public',
        'server.js',
        'next.config.js',
        'pm2-app.json',
        'package.json',
        'package-lock.json',
      ];
      await copyFiles('client', list);
      console.log(`buildClient success!`);
    });
  } catch (err) {
    console.log('build failed: \n' + err);
  }
};

const buildAdmin = () => {
  try {
    rimraf(join('./dist/admin'), async () => {
      const list = ['dist'];
      await copyFiles('admin', list);
      console.log(`buildAdmin success!`);
    });
  } catch (err) {
    console.log('build failed: \n' + err);
  }
};

switch (process.env.BUILD_TYPE) {
  case 'client':
    buildClient();
    break;
  case 'server':
    buildServer();
    break;
  case 'admin':
    buildAdmin();
    break;
  default:
    break;
}
