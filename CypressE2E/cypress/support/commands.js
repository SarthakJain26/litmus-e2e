/// <reference types="Cypress" />
//This Script provides custom commands for tests.

import "cypress-localstorage-commands"
/* loginServer() command for stubbing a server 
with /auth/login route with any status code and login details provided as argument.*/
Cypress.Commands.add('loginServer',(loginStatus,email,password)=>{
    cy.server();
    cy.route({
        method: 'POST',
        url: Cypress.env('baseUrl')+'/login',
        status: loginStatus,
        response: (loginStatus==503)?'':{} 
    }).as('login');
    cy.login(email,password);
    cy.wait('@login');
});

/* modalServer() command for stubbing a server 
with /auth/update route with any status code provided as argument.*/
Cypress.Commands.add('modalServer',(modalStatus,ProjectName,Name,Email,Password)=>{
    cy.server();
    cy.route({
        url:'/update/details',
        method: 'POST',
        status: modalStatus,
        response: (modalStatus==503)?'':{email: "Vedant@Gmail.com",name: "Vedant"}
    }).as('updateDetails');
    cy.welcomeModalInputs(ProjectName,Name,Email,Password);
    cy.wait('@updateDetails');
})

// Custom command for Inputting details in Welcome Modal.
Cypress.Commands.add('welcomeModalInputs',(ProjectName,Name,Email,Password)=>{
    cy.get('[data-cy=InputProjectName] input').type(ProjectName);
    cy.get('[data-cy=Continue]').click();
    cy.get('[data-cy=InputName] input').type(Name)
    cy.get('[data-cy=Button]').eq(0).click();
    cy.get('[data-cy=InputPassword] input').each(($div)=>{
        cy.wrap($div).type(Password);
    });
    cy.get('[data-cy=Button]').eq(0).click();
    cy.get('[data-cy=InputEmail]').type(Email);
    cy.get('[data-cy=Button]').eq(0).click();
})


//Custom command for Inputting Login Details.
Cypress.Commands.add('login',(Email,Password)=>{
    cy.get('[name=username]').type(Email);
    cy.get('[name=password]').type(Password);
    cy.get('[data-cy=loginButton]').click();
})