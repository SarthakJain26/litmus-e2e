/// <reference types="Cypress" />

describe("Testing the accessibility of Welcome Modal",()=>{
    before("Logging In to Litmus-Portal",()=>{
        indexedDB.deleteDatabase('localforage');
        cy.visit('/');
        cy.login("admin","litmus");
    });

    beforeEach("Clearing local storage",()=>{
        indexedDB.deleteDatabase('localforage');
    })

    it("Visiting the Welcome Modal after Login",()=>{
        cy.contains('Welcome to Litmus Portal').should('be.visible');
        cy.log("Reached the Welcome Modal Successfully");
    });

    // it("Using Modal without inputting any details",()=>{
    //     cy.welcomeModalInputs(' ',' ',' ',' ');
    //     cy.contains('Congratulations').should('not.be.visible');
    // });

    // it("Using Modal by partially inputting details",()=>{
    //     cy.welcomeModalInputs('Project','admin','litmus',' ');
    //     cy.contains('Congratulations').should('not.be.visible');
    // });
    
    it("Using Modal by inputting all details",()=>{
        cy.welcomeModalInputs('Project','admin','litmus','1234');
        cy.contains('Congratulations').should('be.visible');
    });
})


