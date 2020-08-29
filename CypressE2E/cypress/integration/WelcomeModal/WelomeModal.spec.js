/// <reference types="Cypress" />

describe("Testing the accessibility of Welcome Modal",()=>{
    before("Logging In to Litmus-Portal",()=>{
        indexedDB.deleteDatabase('localforage');
        cy.visit('/');
        cy.loginServer(200,"Vedant","1234");
    });

    beforeEach("Refreshing to get welcome Modal again",()=>{
        cy.visit('/');
    })

    it("Visiting the Welcome Modal after Login",()=>{
        cy.contains('Welcome to Litmus Portal').should('be.visible');
        cy.log("Reached the Welcome Modal Successfully");
    });

    it("Using Modal without inputting any details",()=>{
        cy.modalServer(200,' ',' ',' ',' ');
        cy.contains('Congratulations').should('not.be.visible');
    });

    it("Using Modal by partially inputting details",()=>{
        cy.modalServer(503,'Project','Name','Litmus@mayadata.io',' ');
        cy.contains('Congratulations').should('not.be.visible');
    });
    
    it("Using Modal by inputting all details",()=>{
        cy.modalServer(200,'Project','Name','Litmus@mayadata.io','1234');
        cy.contains('Congratulations').should('be.visible');
    });
})


