/// <reference types="cypress"/>

describe("Our first test suite", () => {

    before('goes to site', () => {
        cy.visit('/')
        cy.contains('Forms').click()
    })

    it("first test", () => {

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

    it('second test', () => {

        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.get('#inputEmail3')
            .parents('form').find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="Email"]')

    })

    it('then and wrap methods', () => {

        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const firstFormEmail = firstForm.find('[for="inputEmail1"]').text()
            expect(firstFormEmail).to.equal('Email')
            const firstPasswordLabel = firstForm.find('[for="inputPassword2"]').text()
            expect(firstPasswordLabel).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const secondPasswordLabel = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(firstPasswordLabel).to.equal(secondPasswordLabel)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })
    })

    it('invoke command', () => {

        cy.contains('Form Layouts').click()

        //method 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //method 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        //method 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then (label => {
            expect(label).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
        
        
    })

    it('assert property', () => {

        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then( input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('20').click()
                cy.wrap(input).invoke('prop', 'value').should('contain', 'Aug 20, 2021')
            })

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then( input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('3').click()
                cy.wrap(input).invoke('prop', 'value').should('contain', 'Aug 3, 2021')
        }) 

    })

    it('radio buttons', () => {

        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).first().check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons).eq(1).check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons).eq(0)
            .should('not.be.checked')

            cy.wrap(radioButtons).eq(2)
            .should('be.disabled')
        })

    })

    it('checkboxes', () => {

        cy.contains('Modal').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})

    })

    it.only('lists and dropdowns', () => {
        
        //method 1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').click().should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //method 2

        cy.get('nav nb-select').click().then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                
                const itemText = listItem.text().trim()

                const colors = {
                    Light : "rgb(255, 255, 255)",
                    Dark : "rgb(34, 43, 69)",
                    Cosmic : "rgb(50, 50, 89)",
                    Corporate : "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }

            })
        })
    })
})