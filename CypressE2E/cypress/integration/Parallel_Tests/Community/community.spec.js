/// <reference types="Cypress" />

describe("Testing the accessibility of Community page",()=>{
    
    it("Visiting the Community page",()=>{
        indexedDB.deleteDatabase('localforage');
        cy.server();
        cy.visit('/login');
        cy.login("admin","litmus")
        cy.visit('/community');
        cy.url().should('include','/community');
        cy.log("Visited the community page Successfully");
    });
})

