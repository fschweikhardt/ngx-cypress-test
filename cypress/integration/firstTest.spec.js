/// <reference types="cypress"/>

describe("Our first test suite", () => {

    it("first test", () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by id
        cy.get('#inputEmail')

        //by clss name
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[placeholder]')

        //by attribute name and value
        cy.get('[placeholder="Email"]')

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name
        cy.get('input[placeholder="Email"]')

        //two different attributes
        cy.get('[placeholder="Email"][type="Email"]')

        //by tag name, attribute value, id and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //recommended
        cy.get('[data-cy="imputEmail1"]')
    })
     
})