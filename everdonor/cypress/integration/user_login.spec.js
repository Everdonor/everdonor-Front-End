describe('User Login Test', () => {
    it('Logins the user Comedor Nuevo', () => {
        cy.server()
        cy.route('POST', 'localhost:8080/login').as('login')

        cy.visit('http://localhost:3000/login')

        cy.get('input[id=email]').type("comedor_nuevo@gmail.com")
        cy.get('input[id=password]').type("totallyNewNotTheifablePassword")
        cy.wait(1000)
        cy.get('button[id=submit]').click()
        cy.wait('@login')
        cy.get('@login').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.method).to.eq('POST')
            expect(xhr.getAllResponseHeaders()).to.contains('Authorization')
        })

    })
})