/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getTheme(): Chainable<Element>;
  }
}
