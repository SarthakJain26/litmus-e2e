/// <reference types="Cypress" />
describe("Testing the Browse Schedule Tab", () => {
	//Login before initialization of test cases
	beforeEach("Clearing local storage", () => {
		cy.clearCookie("token");
		indexedDB.deleteDatabase("localforage");
		cy.server();
		cy.visit("/login");
		cy.route("POST", "/login").as("loginResponse"); //Alias for Login Route
		cy.login("admin", "litmus");
		cy.wait("@loginResponse")
			.its("status")
			.should("eq", 200)
			.log("Login Successful"); //Request Done.
	});
	it("Visiting the Browse Schedule Tab and verifying the availability of data", () => {
		cy.wait(2000); //Waiting for the homepage to load successfully
		cy.get("[data-cy=workflows]").click();
		cy.url().should("contain", "workflows");
		cy.get("[data-cy=browseSchedule] > .MuiTab-wrapper");
		cy.route({
			method: "POST",
			url: "/query",
		}).as("scheduleData"); //Alias for the WorkflowSchedule Query
		cy.get("[data-cy=browseSchedule] > .MuiTab-wrapper").click();
		cy.get("[data-cy=browseScheduleTable]").should("exist");
		cy.log("Browse Workflow Schedule Visible");
		//Get WorkFlowSchedules data from the query
		cy.wait("@scheduleData").then((data) => {
			if (JSON.parse(data.xhr.responseText).data.getScheduledWorkflows.length) {
				cy.get("[data-cy=browseScheduleData]").should("exist");
				cy.log("Table data is present");
			} else if (
				JSON.parse(data.xhr.responseText).data.getScheduledWorkflows.length == 0
			) {
				cy.get("[data-cy=browseScheduleNoData]").should("exist");
				cy.log("Table data is not present");
			} else if (data.status !== 200) {
				cy.get("[data-cy=browseScheduleError]").should("exist");
				cy.log("Error while fetching data");
			}
		});
	});
	it("Testing the menu options in first row of Browse Schedule Table", () => {
		cy.wait(2000); //Waiting for the homepage to load successfully
		cy.get("[data-cy=workflows]").click();
		cy.url().should("contain", "workflows");

		cy.get("[data-cy=browseSchedule] > .MuiTab-wrapper");
		cy.route({
			method: "POST",
			url: "/query",
		}).as("scheduleData"); //Alias for the WorkflowSchedule Query
		cy.get("[data-cy=browseSchedule] > .MuiTab-wrapper").click();
		cy.get("[data-cy=browseScheduleTable]").should("exist");
		cy.log("Browse Workflow Schedule Visible");
		//Get WorkFlowSchedules data from the query
		cy.wait("@scheduleData").then((data) => {
			if (JSON.parse(data.xhr.responseText).data.getScheduledWorkflows.length) {
				cy.get("[data-cy=browseScheduleData]");
				cy.get("[data-cy=browseScheduleOptions]").first().click();
				cy.get("[data-cy=deleteSchedule]").first().should("exist"); //Delete Schedule Option
			} else {
				cy.log("No data available");
			}
		});
	});
	// it("Testing the menu options to delete the schedule", () => {
	// 	cy.wait(2000);
	// 	cy.get("[data-cy=workflows]").click();
	// 	cy.url().should("contain", "workflows");

	// 	cy.get("[data-cy=browseSchedule] > .MuiTab-wrapper");
	// 	cy.route({
	// 		method: "POST",
	// 		url: "/query",
	// 	}).as("scheduleData");
	// 	cy.get("[data-cy=browseSchedule] > .MuiTab-wrapper").click();
	// 	cy.get("[data-cy=browseScheduleTable]").should("exist");
	// 	cy.log("Browse Workflow Schedule Visible");
	// 	cy.wait("@scheduleData").then((data) => {
	// 		if (JSON.parse(data.xhr.responseText).data.getScheduledWorkflows.length) {
	// 			JSON.parse(data.xhr.responseText).data.getScheduledWorkflows.forEach(
	// 				(data) => {
	// 					cy.log(data.workflow_name);
	// 				}
	// 			);
	// 			cy.get("[data-cy=browseScheduleData]");
	// 			cy.get("[data-cy=browseScheduleOptions]").first().click();
	// 			cy.get("[data-cy=deleteSchedule]").first().should("exist");
	// 		} else {
	// 			cy.log("No data available");
	// 		}
	// 	});
	// });
});