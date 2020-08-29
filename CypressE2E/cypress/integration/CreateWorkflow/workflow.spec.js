/// <reference types="Cypress" />

describe("Testing the create Workflow Utility",()=>{
    
    before("Clearing the Cookies and deleting the ",()=>{
        cy.clearCookies();
        indexedDB.deleteDatabase('localforage');
    });

    it("Logging in to the litmus portal",()=>{
        cy.visit('/');
        cy.loginServer(200,"vedant","1234");
    });

    it("Checking the accessibility of Create-Workflow Page",()=>{
        cy.visit('create-workflow');
        cy.url().should('contain','/create-workflow');
        cy.contains('Choose the target Kubernetes cluster').should('be.visible');
    });

    it("Selecting a Cluster Installation [ Internal or External ]",()=>{
        cy.visit('/create-workflow');
        cy.get('[data-cy=External]').click();
        
    })
})
