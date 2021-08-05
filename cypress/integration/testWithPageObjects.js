/// <reference types="cypress"/>

import { navigateTo } from "../support/page_objects/navigationPage"

describe.only('test with page objects', () => {

    beforeEach('go to page', () => {
        cy.visit('/')
    })

    it('verify navigation across the page', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
    })


})