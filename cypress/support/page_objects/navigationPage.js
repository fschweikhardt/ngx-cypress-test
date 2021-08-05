function checkIfExpanded(title) {
    //if title contains chevron-left
    //click a
    cy.log(title)
    cy.contains('a', title).then( icon => {
        cy.wrap(icon).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if (attr.includes('left')) {
                cy.wrap(icon).click()
            }
        })
    })
}

export class NavigationPage {

    formLayoutsPage() {
        checkIfExpanded('Forms')
        cy.contains('Form Layouts').click()
    }

    datePickerPage() {
        checkIfExpanded('Forms')
        cy.contains('Datepicker').click()
    }

    toastrPage() {
        checkIfExpanded('Modal & Overlays')
        cy.contains('Toastr').click()
    }   

    smartTablePage() {
        checkIfExpanded('Tables & Data')
        cy.contains('Smart Table').click()
    }

    toolTipPage() {
        checkIfExpanded('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new NavigationPage()