/// <reference types="Cypress" />

describe("Testing the create Workflow Utility",()=>{
    
    before("Clearing the Cookies and deleting the ",()=>{
        cy.clearCookies();
        indexedDB.deleteDatabase('localforage');
        cy.requestLogin();
    });

    it("Checking the accessibility of the Create-Workflow Page",()=>{
        cy.visit('/create-workflow');
        cy.url().should('contain','/create-workflow');
        cy.contains('Choose the target Kubernetes cluster').should('be.visible');
    });

    it("Selecting a Cluster Installation [ Internal or External ]",()=>{
        cy.visit('/create-workflow');
        cy.get('[data-cy=External]').click();
        
    })
})
