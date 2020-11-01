describe('Search User', () => {
    it('Searches for a user', () => {
        cy.server()
        cy.route("GET", 'http://localhost:8080/users/5').as('user')

        cy.visit('http://localhost:3000/map')

        cy.get('input[id=Name]').type("Tobias")
        cy.wait(1000)
        cy.get('button[id=SearchIcon]').click()
        cy.wait(1000)
        cy.get('img[id=id_Tobias_marker]').click()
        cy.get('button[id=id_Tobias_vermas]').click({ multiple: true, force: true })

        cy.url().should('include', '/user/5')

        cy.wait('@user')
        cy.get('@user').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.method).to.eq('GET')
            expect(xhr.response.body).to.contain({ id: 5, name: "Tobias", email: "tobiascalvento@hotmail.com" })
        })

    })
})