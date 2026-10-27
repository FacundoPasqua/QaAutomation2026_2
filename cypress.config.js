const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Con baseUrl podemos escribir cy.request('/products')
    baseUrl: 'https://api.practicesoftwaretesting.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
})
