describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.server()
        cy.route('POST', 'http://localhost:8080/sign-up').as('register')

        cy.visit('http://localhost:3000/user/register')

        cy.get('input[id=name]').type("Tobias")
        cy.get('input[id=email]').type("tobiascalvento@hotmail.com")
        cy.get('input[id=password]').type("53640172")
        cy.get('input[id=phoneNumber]').type("1132823363")
        cy.get('div[id=donation]').click().get('li[id=Food]').click()
        cy.get('input[id=address]').type("Vicente Lopez y Planes 49")
        cy.get('div[id=testMap]').click()
        cy.fixture('large_everdonor.png').then(fileContent => {
            cy.get('input[type=File]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'testPicture.png',
                mimeType: 'image/png'
            });
        });
        cy.wait(1000)
        cy.get('button[id=submit]').click()
        cy.wait('@register')
        cy.get('@register').then(function (xhr) {
            expect(xhr.status).to.eq(201)
            expect(xhr.method).to.eq('POST')
        })

    })
})