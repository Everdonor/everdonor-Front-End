describe('User Login Test', () => {
    it('Logins the user Comedor Nuevo', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input[id=email]').type("tobiascalvento@hotmail.com")
        cy.get('input[id=password]').type("53640172")
        cy.get('button[id=submit]').click()
        cy.url().should('include', '/map')
    })
})