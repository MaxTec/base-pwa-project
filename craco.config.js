const CracoLessPlugin = require("craco-less");
const { getThemeVariables } = require("antd/dist/theme");
const fs = require("fs");
const path = require("path");
const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, "./src/theme.less"), "utf8"));

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            modifyVars: themeVariables,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
