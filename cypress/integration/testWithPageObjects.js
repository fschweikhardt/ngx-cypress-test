/// <reference types="cypress"/>

import { navigateTo } from "../support/page_objects/NavigationPage"

describe('test with page objects', () => {

    beforeEach('go to page', () => {
        cy.visit('/')
    })

    it('verify navigation across the page', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toastrPage()
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
    })


})