/// <reference types="Cypress" />

describe("Testing the accessibility of Community page",()=>{
    
    it("Visiting the Community page",()=>{
        indexedDB.deleteDatabase('localforage');
        cy.visit('/login');
        cy.loginServer(200,"Vedant","1234")
        cy.visit('/community');
        cy.url().should('include','/community');
        cy.log("Visited the community page Successfully");
    });
})

