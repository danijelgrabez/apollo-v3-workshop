describe('Global actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can sort country list', () => {
    cy.findAllByTestId(/country-item/i)
      .get('li')
      .first()
      .should('have.text', 'Afghanistan');

    cy.findByTestId(/^sort$/).click();

    cy.findAllByTestId(/country-item/i)
      .get('li')
      .first()
      .should('have.text', 'Zimbabwe');
  });

  it('can change and persist theme', () => {
    cy.getTheme().should('be.a', 'string').should('be.equal', 'LIGHT');

    cy.findByTestId(/toggle-theme/).click();
    cy.getTheme().should('be.equal', 'DARK');
    cy.visit('/');
    cy.getTheme().should('be.equal', 'DARK');
  });
});
