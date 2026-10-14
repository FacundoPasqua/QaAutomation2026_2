describe('Login', () => {
beforeEach(() => {
    cy.visit('https://cypress-playground.vercel.app/login')
})

    it('login vacio', () => {
       cy.get("[data-testid='login-submit']").click()
       const name = 'inválidas'
       cy.contains(`Credenciales ${name}`).should('be.visible')
    })

    it('login con usuario y contraseña inválidos', () => {  
        cy.get('[data-testid="login-email"]').type('usuario_invalido')
        cy.get('[data-testid="login-password"]').type('contraseña_invalida')
        cy.get("[data-testid='login-submit']").click()
        cy.contains(`Credenciales inválidas`).should('be.visible')
    } )

    it('login con usuario y contraseña válidos', () => {
        cy.get('[data-testid="login-email"]').type('admin@xacademy.com')
        cy.get('[data-testid="login-password"]').type('cypress123')
        cy.get("[data-testid='login-submit']").click()
        cy.contains(`Inicio de sesión exitoso. Redirigiendo...`).should('be.visible')
    
       
    })
})