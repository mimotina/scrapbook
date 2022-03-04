   
        cy.get('div[class="sc-bSFVuW mKSI"]').then(($span) =>{
            const totalSum =$span.text().slice(0, -1).replace(',', '')

            cy.get('a[class="sc-biBrSq rrVpB"]:first').then(($span) =>{
                const price = $span.text().replace( /[A-zА-я$€]+/g, "" ).replace(',', '').slice(5, -10)
                cy.log(totalSum)
                cy.log(price)
        if (totalSum == price) {cy.log('Positive')     } else { cy.log('Negative')}     }) 
        })




        // cy.request('GET', 'https://apps-test.scrappbook.de/api/collection/shop/products?collection_id=B18xN2k9F').then((response) =>{
       // expect(response).to.have.property('status', 200)
        //expect(response).property('body').to.have.property('length')
        
       // cy.request('GET', 'https://apps-test.scrappbook.de/api/collection/shop/products?collection_id=B18xN2k9F')
       // .its('body').should('be.an', 'array').its('5')
       // .should('contain', {
      //      order: 7,
       /*   })
          cy.request('GET', 'https://apps-test.scrappbook.de/api/collection/shop/products?collection_id=B18xN2k9F')
        .its('body').should('be.an', 'array').its('5').its('products').should('be.an', 'array').its('0')
        .should('contain', {
            grossTotalPrice: 4700
        }).as('price1');
        
    })
    cy.log(price1)  */

   /* Scanner in = new Scanner(System.in);
    String element;
    int max = 0;

    while (element != 0) {
        element = in.nextLine();



    }*/