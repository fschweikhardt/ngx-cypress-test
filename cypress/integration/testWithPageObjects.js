/// <reference types="cypress"/>

import { onDatePickerPage } from "../support/page_objects/DatePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/FormLayoutsPage"
import { navigateTo } from "../support/page_objects/NavigationPage"
import { onSmartTablePage } from "../support/page_objects/SmartTablePage"

describe('test with page objects', () => {

    beforeEach('go to page', () => {
        cy.openHomePage()
    })

    it('verify navigation across the page', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toastrPage()
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
    })

    it('should submit inline and basic form and select date tomorrow on calendar', () => {
        navigateTo.formLayoutsPage()
            onFormLayoutsPage.submitInlineFormWithNameandEmail("franz", "franz@dev.com")
            onFormLayoutsPage.submitBasicFormWithEmailandPassword('test@test.com', 'test')
        navigateTo.datePickerPage()
            onDatePickerPage.selectDateOnCalender(1)
            onDatePickerPage.selectRangeOnCalender(7, 14)
        navigateTo.smartTablePage()
            onSmartTablePage.modifyAgeBasedOffName('Larry', 50)
            onSmartTablePage.addNewRecordToTable('Franz', 'Evan')
            onSmartTablePage.deleteRowByIndex(2)
    })


})