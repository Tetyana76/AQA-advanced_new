import { LoginPage, LoginDetails } from '../e2e/pageObjectModels/loginPage';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
    const email = Cypress.env('user').email;  // Use Cypress.env() to get values
    const password = Cypress.env('user').password;  // Same for password
    const loginPage = new LoginPage();
      // const loginDetails = new LoginDetails();
    // loginDetails.navigateToMainPageWithLogin();
    loginPage.signInButton().click(); 
    loginPage.signinEmail().type(email); 
    loginPage.signinPassword().type(password); 
    loginPage.loginButton().click();
    loginPage.verifyRedirectToGaragePage();
    loginPage.verifyGaragePageElements();
});

Cypress.Commands.add("createExpense", (carId, mileage, liters, totalCost) => {
    const reportedAt = new Date().toISOString();

    cy.request({
        method: "POST",
        url: "https://qauto.forstudy.space/api/expenses",
        body: {
            carId: carId,
            reportedAt: reportedAt,
            mileage: mileage,
            liters: liters,
            totalCost: totalCost
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("status", "ok");
        expect(response.body).to.have.property("data");

        const expenseData = response.body.data;
        expect(expenseData).to.have.property("id");
        expect(expenseData.carId).to.eq(carId);
        expect(expenseData.reportedAt).to.eq(reportedAt);
        expect(expenseData.mileage).to.eq(mileage);
        expect(expenseData.liters).to.eq(liters);
        expect(expenseData.totalCost).to.eq(totalCost);

        return expenseData.id;
    });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})