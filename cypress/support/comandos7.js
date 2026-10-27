// Comando propio: hace login por API y devuelve el token.
// Uso: cy.apiLogin().then((token) => { ... })
Cypress.Commands.add('apiLogin', () => {
  return cy.request('POST', '/users/login', {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
  }).its('body.access_token')
})
