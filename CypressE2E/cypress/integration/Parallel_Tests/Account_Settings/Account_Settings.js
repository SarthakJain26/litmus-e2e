/// <reference types="Cypress" />
describe("Testing the My accounts section", () => {
    before("Clearing the Cookies and deleting the ", () => {
      cy.clearCookies();
      indexedDB.deleteDatabase("localforage");
      cy.visit("/");
      cy.login("admin", "litmus");
    });
    it("Checking the accessibility of the Settings", () => {
      cy.visit("/settings");
      cy.url().should("contain", "/settings");
      cy.contains("Settings").should("be.visible");
    });
    it("Checking the accessibility of My Accounts", () => {
      cy.get("[data-cy=my-account]").click();
      cy.contains("Personal Details ").should("be.visible");
    });
  });