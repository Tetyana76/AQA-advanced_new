import { defineConfig } from "cypress";

export default defineConfig({
  retries: { runMode: 0, openMode: 0 },
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  viewportWidth: 1400,
  viewportHeight: 900,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://example.cypress.io',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});