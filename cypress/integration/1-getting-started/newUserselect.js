
import Login from '../PageObject/log'
//click the Packages. n - the number of Packages 
let n = 0
// p - amount of photo
let p = 7
let totalSum;
let newSum;

describe('Select photo', () => {
    const login = new Login()
    it('select photo', () => {
        cy.clearCookies()
        login.url()
        cy.viewport(1920, 1080)
        //click the "Shop"button
        cy.get('a[class="gallery-button cursor-pointer border-0"]').contains('Shop').click();
        cy.url().should('include', '/shop');
        //click the "Dateien"button
        cy.get('div[data-cy="component-digital"]').click();
        cy.url().should('include', '/products');
        

        cy.get('a[class="sc-biBrSq rrVpB"]').eq(n).should('be.visible').then(($span) => {
            const price = $span.text().replace(/[A-zА-я$€]+/g, "").replace(',', '').slice(5, -10)
            const amount = $span.text().replace(/[A-zА-я$€]+/g, "").replace(',', '').slice(0, -19)
            const extraPhoto = $span.text().replace(/[A-zА-я$€]+/g, "").slice(12, -1).replace(',', '')
            cy.log(amount)
            cy.log(extraPhoto)
            cy.log(price).click()
         
            cy.get('button[data-cy="component-button"]').contains('0 selected from at least ' + amount + 'images').should('be.visible')

            for (let i = 1; i <= p; i++) {
                if (i < p ) {
                    if (i < amount && i < p  ) {
                        cy.get('[data-cy="component-button"]').click()
                        cy.get('.sc-nFpLZ').should('contains.text', 'You need to select ' + amount + 'images for this product. Please select more images.')
                        cy.get('.sc-nFpLZ > .Buttons__Button-sc-1gnfc88-0').click()
                        cy.get(`div[data-cy="component-image_${i}"]`).first().click()
                        cy.contains(`${i} selected from at least ${amount}images`).should('be.visible')
                        cy.url().should('include', '/select-photo')                            
                    }
                    else if (i<amount && i == p && p<amount) {
                        cy.get(`div[data-cy="component-image_${i}"]`).first().click()
                        cy.contains(`${i} selected from at least ${amount}images`).should('be.visible')
                    }
                    else {
                        cy.get(`div[data-cy="component-image_${i}"]`).first().click()
                        cy.contains(`Next step with ${i} images`).should('be.visible')
                    }
                }
                else {
                    cy.get(`div[data-cy="component-image_${i}"]`).first().click()
                    cy.contains(`Next step with ${p} images`).should('be.visible').click()
                }
            }

            let price1
            cy.get('div[class="sc-bSFVuW mKSI"]').then(($span) => {
                totalSum = $span.text().slice(0, -1).replace(',', '')
                price1 = (+price + ((p - amount) * extraPhoto))
                if (totalSum == price1) { cy.log('Positive') } else { cy.log('Negative') }
                cy.log('Actual', totalSum)
                cy.log('Expected', price1)

            })
        })
    })

})

describe('Select photo', () => {
    
    const login = new Login()
    it('select photo', () => {
        cy.get('button[data-cy="component-continue-button"]').contains('Continue').click();
        cy.get('.sc-DJfgX > :nth-child(1) > .sc-ezrdKe')
        .type('test@test.com').should('have.value', 'test@test.com')
        cy.get('.sc-DJfgX > :nth-child(2) > :nth-child(1) > .sc-ezrdKe')
        .type('Iryna').should('have.value', 'Iryna')
        cy.get(':nth-child(2) > :nth-child(2) > .sc-ezrdKe')
        .type('Test').should('have.value', 'Test')
        cy.get('.pers70-row > .sc-ezrdKe')
        .type('Brook').should('have.value', 'Brook')
        cy.get('.pers30-row > .sc-ezrdKe')
        .type('159').should('have.value', '159')
        cy.get(':nth-child(4) > :nth-child(1) > .sc-ezrdKe')
        .type('123456').should('have.value', '123456')
        cy.get(':nth-child(4) > :nth-child(2) > .sc-ezrdKe')
        .type('London').should('have.value', 'London')
        cy.get(':nth-child(5) > .sc-ezrdKe')
        .type('050955666555').should('have.value', '050955666555')
        cy.get('.sc-jJEJSO').click()
        cy.get('button[class="Buttons__Button-sc-1gnfc88-0 kppqoA"]').contains('Update Shipping').click()


    })
})
    
