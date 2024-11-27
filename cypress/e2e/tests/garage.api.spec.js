import { LoginDetails } from "../pageObjectModels/loginPage";
import GaragePage from "../pageObjectModels/garagePage";
import FuelExpensesPage from "../pageObjectModels/fuelExpensesPage";

describe("Car creation and expense validation", () => {
    const garagePage = new GaragePage();
    const fuelExpensesPage = new FuelExpensesPage();
    const login = new LoginDetails();
    let createdCarId; 
    let carInfo;

    beforeEach(() => {
        login.navigateToMainPageWithLogin();
        cy.login();
    });

    it("Add Cars Tests with Interception", () => {
        const mileage = '25500';

        cy.intercept("POST", "https://qauto.forstudy.space/api/cars").as("createCar");

        garagePage.addCarButton.click();
        carInfo = garagePage.addCar(mileage);

        cy.wait("@createCar").then((interception) => {
            expect(interception.response.statusCode).to.eq(201);

            createdCarId = interception.response.body.data.id;
            cy.log(`Created Car ID: ${createdCarId}`);

        });
        cy.wrap(carInfo).should('exist');

        garagePage.verifyCarBrandInList(carInfo.brand);
        garagePage.verifyCarModelInList(carInfo.model);
        garagePage.mileageInput.should('have.value', carInfo.mileage);

        // Get the car list via API
        cy.request("GET", "https://qauto.forstudy.space/api/cars").then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            const createdCar = response.body.data.find(car => car.id === createdCarId);
            expect(createdCar).to.exist;
            expect(createdCar.brand).to.eq(carInfo.brand);
            expect(createdCar.model).to.eq(carInfo.model);
            expect(createdCar.mileage).to.eq(Number(carInfo.mileage));
        });
    });

    it("Create an expense for the car via API", () => {
        const expenseDetails = {
            mileage: 26500,
            liters: 50,
            cost: 2000
        };

        cy.wrap(carInfo).should('exist');
        cy.wrap(createdCarId).should('exist');

        cy.createExpense(createdCarId, expenseDetails.mileage, expenseDetails.liters, expenseDetails.cost)
            .then((expenseId) => {
                expect(expenseId).to.exist;
                cy.wrap(expenseId).as("createdExpenseId");
            });
    })

    it("Validate the created expense via UI", function () {
    const expenseDetails = {
        mileage: 26500, 
        liters: 50,
        cost: 2000
    };
    cy.wrap(carInfo).should('exist');
    garagePage.verifyCarBrandInList(carInfo.brand);
    garagePage.verifyCarModelInList(carInfo.model);

    fuelExpensesPage.openFuelExpensesPage(carInfo); 

    fuelExpensesPage.checkMileageInTable(expenseDetails.mileage);
    fuelExpensesPage.checkLitersInTable(expenseDetails.liters);
    fuelExpensesPage.checkTotalCostInTable(expenseDetails.cost);
    });
});