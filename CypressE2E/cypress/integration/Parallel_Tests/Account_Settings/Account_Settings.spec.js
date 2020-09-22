/// <reference types="Cypress" />
describe("Testing the My accounts section", () => {

  beforeEach("Clearing local storage",()=>{
    indexedDB.deleteDatabase('localforage');
    cy.server();
    cy.visit('/login');
    cy.route('POST','/login').as('loginResponse'); //Alias for Login Route
    cy.login("admin","litmus"); 
    cy.wait('@loginResponse').its('status').should('eq',200); //Request Done.
    cy.contains('Congratulations').should('be.visible'); //confirmation of HomePage loaded.
  })

  it("Checking the accessibility of the Settings", () => {
    cy.visit("/settings");
    cy.url().should("contain", "/settings");
    cy.contains("Settings").should("be.visible");
  });

});