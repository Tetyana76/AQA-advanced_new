import { defineConfig } from "cypress";
import fs from 'fs-extra';
import * as path from 'path';

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);

  return fs.readJsonSync(pathToConfigFile);
}

export default defineConfig({
  retries: { runMode: 0, openMode: 0 },
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  viewportWidth: 1400,
  viewportHeight: 900,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    "reportDir": "cypress/results",
    "overwrite": false,
    "html": false,
    "json": true
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      const configFile = config.env.configFile || 'qauto';
      const configJson = getConfigurationByFile(configFile);
      config = { ...config, ...configJson };
      config.env.user = config.user;

      return config;
    },
  },
});