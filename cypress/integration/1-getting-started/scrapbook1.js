import Login from '../PageObject/log'
//click the Packages. n - the number of Packages 
let n = 0
// p - amount of photo
let p = 5
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
        

        cy.get('a[class="sc-kYrkKh fcJagU"]').eq(n).should('be.visible').then(($span) => {
            const price = $span.text().replace(/[A-zА-я$€]+/g, "").replace(',', '').slice(5, -10)
            const amount = $span.text().replace(/[A-zА-я$€]+/g, "").replace(',', '').slice(0, -19)
            const extraPhoto = $span.text().replace(/[A-zА-я$€]+/g, "").slice(12, -1).replace(',', '')
            cy.log(amount)
            cy.log(extraPhoto)
            cy.log(price).click()
         
            cy.get('button[data-cy="component-button"]').contains('0 selected from at least ' + amount + 'images').should('be.visible')

            for (let i = 1; i <= p; i++) {
                cy.log(`${i} selected from at least ${amount}images`)
                if (i < p ) {
                    if (i < amount && i <= p  ) {
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
            cy.get('div[class="sc-jlIkXa iyvVfy"]').then(($span) => {
                totalSum = $span.text().slice(0, -1).replace(',', '')
                price1 = (+price + ((p - amount) * extraPhoto))
                if (totalSum == price1) { cy.log('Positive') } else { cy.log('Negative') }
                cy.log('Actual', totalSum)
                cy.log('Expected', price1)
            })
            if (p<amount){then(stop)}
        })
    })


/*}) 

describe('Change photos', () => {
    const login = new Login()
    let p = 7*/

   
   
    it('Change photos', () => {
        cy.get('div[class="sc-jlIkXa iyvVfy"]').then(($span) => {
            totalSum = $span.text().slice(0, -1).replace(',', '')
        cy.get('svg[data-cy="component-edit-icon"]').should('be.visible').click() 
        cy.url().should('include', '/select-photo')
        cy.get(`div[data-cy="component-image_1"]`).first().click()
        cy.get(`div[data-cy="component-image_1"]`).last().click()
        cy.contains(`Next step with ${p} images`).should('be.visible').click()
        cy.get('div[class="sc-jlIkXa iyvVfy"]').then(($span) => {    
        newSum = $span.text().slice(0, -1).replace(',', '')
        if (totalSum == newSum) { cy.log('Positive') } else { cy.log('Negative') } 
        })
        })
    }) 
})

describe('Delete photos', () => {
    const login = new Login()
    it('Delete photos', () => {
        cy.viewport(1920, 1080)
        cy.get('div[class="sc-gWHgXt ghjca-d"]').should('be.visible').click()
        cy.url().should('include', '/shop')

    })
}) 




