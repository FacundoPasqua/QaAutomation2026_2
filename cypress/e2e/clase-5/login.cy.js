describe('Clase 5', ()=>{

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/') 
    })

    it('Validar inputs', ()=>{
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        .and('have.attr','type','password')
        cy.get('[data-test="error"]').should('not.exist')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include','/inventory.html')
    })

    it('Login con campos vacíos',()=>{

        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')
       
    })

    it('Login con pass incorrecta',()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Password is required')

    })

    it('Login con contrasenia incorrecta',()=>{
        // Escribir solo el user, hacer click y validar el mensaje de error
    })


})