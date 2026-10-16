describe('Inventario',()=>{

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/')
        // cy.wait(5000)
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    })

    it('Muestre 6 productos',()=>{
        cy.get('[data-test="inventory-item"]').should('have.length',6)
        cy.get('[data-test="inventory-item-name"]').first().should('have.text','Sauce Labs Backpack')
    })

    it('Carrito',()=>{
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        // cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('not.exist')
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist')
        cy.get('[data-test="shopping-cart-badge"]').should('contain',1)
    })

    it('Ordenar de menor a mayor',()=>{
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        cy.get('[data-test="inventory-item-price"]').first().should('have.text','$7.99')
    })

    it('Agregar 2 productos y quitar 1',()=>{
        // Comprobar el carrito después de cada paso
    })
})