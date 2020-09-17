/// <reference types="Cypress" />

describe("Testing the accessibility of Welcome Modal",()=>{

    beforeEach("Clearing local storage",()=>{
        indexedDB.deleteDatabase('localforage');
        cy.visit('/');
        cy.login("admin","litmus");
        indexedDB.deleteDatabase('localforage');
    })

    it("Visiting the Welcome Modal after Login",()=>{
        cy.contains('Welcome to Litmus Portal').should('be.visible');
        cy.log("Reached the Welcome Modal Successfully");
    });

    it("Using Modal without inputting any details",()=>{
        cy.get('[data-cy=InputProjectName] input').type(' ');
        cy.get('[data-cy=Continue]').click();
        cy.contains('Congratulations').should('not.be.visible');

    });

    it("Using Modal by partially inputting details",()=>{
        cy.welcomeModalInputs('Project','admin','litmus',' ');
        cy.contains('Congratulations').should('not.be.visible');
    });
    
    it("Using Modal by inputting all details",()=>{
        cy.welcomeModalInputs('Project','admin','litmus','John@gmail.com');
        cy.contains('Congratulations').should('be.visible');
    });

})


