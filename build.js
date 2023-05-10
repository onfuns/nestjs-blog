const path = require("path");
const fs = require("fs-extra");
const rimraf = require("rimraf");
const join = (name) => path.join(__dirname, name);

const serverDir = "./packages/server";
const adminDir = "./packages/admin";
const clientDir = "./packages/client";

const copyFiles = async (dir, list) => {
  return await Promise.all(
    list.map(async (file) => {
      const originFile = join(`./${dir}/${file}`);
      if (!fs.existsSync(originFile)) return;
      return await fs.copy(originFile, join(`./dist/${dir}/${file}`));
    })
  );
};

const buildServer = () => {
  try {
    rimraf(join("./dist/server"), async () => {
      const list = [
        "dist",
        "pm2-app.json",
        "package.json",
        "package-lock.json",
      ];
      await copyFiles(serverDir, list);
      console.log(`server build success!`);
    });
  } catch (err) {
    console.log("build failed: \n" + err);
  }
};

const buildClient = () => {
  try {
    rimraf(join("./dist/client"), async () => {
      const list = [
        "dist",
        "public",
        "server.js",
        "next.config.js",
        "pm2-app.json",
        "package.json",
        "package-lock.json",
      ];
      await copyFiles(clientDir, list);
      console.log(`client build success!`);
    });
  } catch (err) {
    console.log("build failed: \n" + err);
  }
};

const buildAdmin = () => {
  try {
    rimraf(join("./dist/admin"), async () => {
      const list = ["dist"];
      await copyFiles(adminDir, list);
      console.log(`admin build success!`);
    });
  } catch (err) {
    console.log("build failed: \n" + err);
  }
};

switch (process.env.BUILD_TYPE) {
  case "client":
    buildClient();
    break;
  case "server":
    buildServer();
    break;
  case "admin":
    buildAdmin();
    break;
  default:
    break;
}
