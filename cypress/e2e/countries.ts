describe('Country list', () => {
  it('can open country from the list', () => {
    cy.visit('/');

    cy.findByTestId(/country-item-RS/i)
      .click()
      .url()
      .should('be.equal', 'http://localhost:3000/countries/RS');
  });
});
