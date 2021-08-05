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
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .and('have.class', 'label')
            .and('have.text', 'Email address')

        //method 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')

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

        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + futureYear
            cy.log(dateAssert)

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if (!dateAttribute.includes(futureMonth) 
                    // && !dateAttribute.includes(futureYear)
                ) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then( input => {
                cy.wrap(input).click()
                let dateAssert = selectDayFromCurrent(60)
                // cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
                cy.wrap(input).should('have.value', dateAssert)

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

    it('lists and dropdowns', () => {
        
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

    it('Web tables', () => {
        
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Frank')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Evan')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumn => {
            cy.wrap(tableColumn).eq(2).should('contain', 'rank')
            cy.wrap(tableColumn).eq(3).should('contain', 'van')

        })

        const ageList = [20, 30, 40, 200]

        cy.wrap(ageList).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if (age === 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('tooltip', () => {

        cy.contains('Modal').click()
        cy.contains('Tooltip').click({force: true})

        cy.contains('nb-card', 'Colored Tooltips').find('Button').first().click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

        cy.contains('nb-card', 'Colored Tooltips').contains('Primary').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it('dialogue box', () => {

        cy.contains('Tables').click()
        cy.contains('Smart Table').click({force: true})

        cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.contains('tr', 'Jacob').find('.nb-trash').click().should('contain', 'Are you sure')

        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(()=> {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

    })

})