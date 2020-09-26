/// <reference types="Cypress" />
describe("Testing the Templates Tab", () => {
	//Function to capitalize the first letter of a word
	const capitalize = (str) => {
		return str.replace(/^\w/, (c) => c.toUpperCase());
	};
	//Login before initialization of test cases
	beforeEach("Clearing local storage", () => {
		cy.clearCookie("token");
		indexedDB.deleteDatabase("localforage");
		cy.server();
		cy.visit("/login");
		cy.route("POST", "/auth/login").as("loginResponse"); //Alias for Login Route
		cy.login("admin", "litmus");
		cy.wait("@loginResponse")
			.its("status")
			.should("eq", 200)
			.log("Login Successful"); //Request Done.
	});
	it("Visiting the Templates tab", () => {
		cy.wait(2000); //Waiting for the homepage to load successfully
		cy.get("[data-cy=workflows]").click();
		cy.url().should("contain", "workflows");
		cy.get("[data-cy=templates] > .MuiTab-wrapper");
		cy.get("[data-cy=templates] > .MuiTab-wrapper").click();
		cy.get("[data-cy=templatesPage]").should("exist");
		cy.log("Templates Tab loaded successfully");
	});
	it("Testing the redirection to template details page on individual Card click", () => {
		cy.wait(2000); //Waiting for the homepage to load successfully
		cy.get("[data-cy=workflows]").click();
		cy.url().should("contain", "workflows");
		cy.get("[data-cy=templates] > .MuiTab-wrapper");
		cy.get("[data-cy=templates] > .MuiTab-wrapper").click();
		cy.get("[data-cy=templatesPage]").should("exist");
		cy.get("[data-cy=expName]").each(($data) => {
			//Get template names from all the templates
			const templateName = $data.text();
			cy.log(templateName);
			//Converting the template name in the following format  =>	node-cpu-hog to Node Cpu Hog
			const expName = templateName
				.split("-")
				.map((text) => `${capitalize(text)} `)
				.join("");
			//Clicking on individual template card and redirecting to the details page
			cy.contains(templateName)
				.click()
				.visit(`/workflows/template/${templateName}`)
				.wait(3000);
			//Checking if the name on template is same in the details page
			cy.get("[data-cy=expName]").should("contain", expName);
			cy.go("back");
			cy.get("[data-cy=templates] > .MuiTab-wrapper");
			cy.get("[data-cy=templates] > .MuiTab-wrapper").click();
		});
	});
});
