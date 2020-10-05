describe('User Login Test', () => {
    it('Logins the user Comedor Nuevo', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input[id=email]').type("comedor_nuevo@gmail.com")
        cy.get('input[id=password]').type("totallyNewNotTheifablePassword")
        cy.get('button[id=submit]').click()
        cy.url().should('include', '/map')
    })
})