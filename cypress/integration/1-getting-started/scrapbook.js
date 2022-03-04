describe('Scrapbook unreg', () => {
    it('By', () => {
        cy.clearCookies()
        cy.visit('https://apps-test.scrappbook.de/B18xN2k9F');
        cy.viewport(1920 , 1080)
        //click the "Shop"button
        cy.get('a[class="gallery-button cursor-pointer border-0"]').contains('Shop').click();
        cy.url().should('include', '/shop');
        //click the "Dateien"button
        cy.get('div[data-cy="component-digital"]').click();
        cy.url().should('include', '/products');
        //click the First price

        let price;
        let totalSum;
        let price1;
        
        cy.get('a[class="sc-biBrSq rrVpB"]:first').intercept('POST', 'grossTotalPrice')
        cy.get('a[class="sc-biBrSq rrVpB"]:first').then(($span) =>{
          const price = $span.text().replace( /[A-zА-я$€]+/g, "" ).replace(',', '').slice(5, -10)
          cy.log(price).click()
        
       
        //open list photos
        cy.contains('0 selected from at least 5 images')
        .should('be.visible')
        //click the '0 selected from at least 5 images' button without selecting
        cy.get('[data-cy="component-button"]').click()
        cy.get('.sc-nFpLZ')
        .should('contains.text', 'You need to select 5 images for this product. Please select more images.')
        //close popup
        cy.get('.sc-nFpLZ > .Buttons__Button-sc-1gnfc88-0').click()
        //select photo
        cy.get('div[data-cy="component-image_1"]:first').click()
        cy.contains('1 selected from at least 5 images').should('be.visible')

        cy.get('div[data-cy="component-image_2"]:first').click()
        cy.contains('2 selected from at least 5 images').should('be.visible')

        cy.get('div[data-cy="component-image_3"]:first').click()
        cy.contains('3 selected from at least 5 images').should('be.visible')

        cy.get('div[data-cy="component-image_4"]:first').click()
        cy.contains('4 selected from at least 5 images').should('be.visible')

        cy.get('div[data-cy="component-image_5"]:first').click()
        cy.contains('Next step with 5 images').should('be.visible').click()

        cy.get('div[class="sc-bSFVuW mKSI"]').should('be.visible')
        

        cy.get('div[class="sc-bSFVuW mKSI"]').then(($span) =>{
        totalSum =$span.text().slice(0, -1).replace(',', '')
            
        if (totalSum == price) {cy.log('Positive')} else { cy.log('Negative')}   
        cy.log('Actual', totalSum)
        cy.log('Expected', price)
    
    })

                    
   })
})
})
