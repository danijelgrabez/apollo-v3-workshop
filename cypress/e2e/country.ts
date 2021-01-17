describe('Country', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/countries/RS');
  });
  it('can open country from the list', () => {
    cy.findByTestId(/country-RS/i).should('have.text', '🇷🇸 Serbia');
  });
  it('can search for other country from the page', () => {
    cy.findByTestId(/search/i).type('DE');

    cy.findByTestId(/country-item-DE/i)
      .click()
      .url()
      .should('be.equal', 'http://localhost:3000/countries/DE');

    cy.findByTestId(/country-DE/i).should('have.text', '🇩🇪 Germany');
  });

  it('can navigate back to country list', () => {
    cy.findByTestId(/back/i).click();
    cy.findByTestId(/page-title/i).should('have.text', 'Countries');
  });
});
