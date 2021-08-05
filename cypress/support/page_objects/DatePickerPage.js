
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
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert
}

export class DatePickerPage {

    selectDateOnCalender(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectRangeOnCalender(date1, date2) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(date1)
            let dateAssertSecond = selectDayFromCurrent(date2)
            let finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const onDatePickerPage = new DatePickerPage()