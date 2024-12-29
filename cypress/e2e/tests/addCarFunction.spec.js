import { LoginDetails } from "../pageObjectModels/loginPage";
import GaragePage from "../pageObjectModels/garagePage";
import FuelExpensesPage from "../pageObjectModels/fuelExpensesPage";

describe("Add Cars Tests", () => {
    const garagePage = new GaragePage();
    const fuelExpensesPage = new FuelExpensesPage();
    const login = new LoginDetails();
      

    beforeEach(() => {
        login.navigateToMainPageWithLogin();
        cy.login();
    });

    it("should add a car with random brand and model and valid mileage", () => {
        const mileage = '15000';
        garagePage.addCarButton.click();
        const carInfo = garagePage.addCar(mileage);
        cy.log(`Car Brand: ${carInfo.brand}`);
        cy.log(`Car Model: ${carInfo.model}`);
        cy.log(`Car Mileage: ${carInfo.mileage}`);

        garagePage.verifyCarBrandInList(carInfo.brand);
        garagePage.verifyCarModelInList(carInfo.model);
        garagePage.mileageInput.should('have.value', carInfo.mileage);
    });

    it("Check error message when add car with empty mileage", () => {
        const mileage = ' ';
        garagePage.addCarButton.click();
        garagePage.addCar(mileage);
        garagePage.mileageRequiredMessage.should("be.visible").and("contain.text", "Mileage cost required");
        garagePage.addButton.should("be.disabled");
    });

    it("Check expense report for the added car with valid data", () => {
        fuelExpensesPage.addFuelExpenseButton.click();
        const customIncrement = 500;
        fuelExpensesPage.incrementMileageValue(customIncrement);
        fuelExpensesPage.addExpenseMileage.invoke('val').then((newValue) => {
        cy.log(`Mileage after increment: ${newValue}`);
        });
        fuelExpensesPage.numberOfLiters.clear().type("500");
        fuelExpensesPage.totalCost.clear().type("20000");
        fuelExpensesPage.addButton.click();
    });

    it.skip("Check expense report: invalid Mileage", () => {
         // TODO: Known issue, expected to fail due to incorrect error message
        fuelExpensesPage.addFuelExpenseButton.click();
        const customIncrement = 0;
        fuelExpensesPage.incrementMileageValue(customIncrement);
        fuelExpensesPage.addExpenseMileage.invoke('val').then((newValue) => {
        cy.log(`Mileage after increment: ${newValue}`);
        });
        fuelExpensesPage.numberOfLiters.clear().type("500");
        fuelExpensesPage.totalCost.clear().type("20000");  
        fuelExpensesPage.addButton.click();
        fuelExpensesPage.alertMessage.should("be.visible").and("contain.text", "New mileage must not be equal to any today's expense values");
    });

    it("Check expense report: empty Number of liters field", () => {
        fuelExpensesPage.addFuelExpenseButton.should('be.visible').and('not.be.disabled');
        fuelExpensesPage.addFuelExpenseButton.click();
        const customIncrement = 300;
        fuelExpensesPage.incrementMileageValue(customIncrement);
        fuelExpensesPage.addExpenseMileage.invoke('val').then((newValue) => {
        cy.log(`Mileage after increment: ${newValue}`);
        });
        fuelExpensesPage.numberOfLiters.clear().type(" ");
        fuelExpensesPage.addButton.click({force: true});
        fuelExpensesPage.numberOfLitersRequired.should("be.visible").and("contain.text", "Liters required");
    });

    it("Check expense report: empty Total Cost field", () => {
        fuelExpensesPage.addFuelExpenseButton.click();
        const customIncrement = 300;
        fuelExpensesPage.incrementMileageValue(customIncrement);
        fuelExpensesPage.addExpenseMileage.invoke('val').then((newValue) => {
        cy.log(`Mileage after increment: ${newValue}`);
        });
        fuelExpensesPage.numberOfLiters.clear().type("400");
        fuelExpensesPage.totalCost.clear().type(" "); 
        fuelExpensesPage.addButton.click({force: true});
        fuelExpensesPage.totalCostRequired.should("be.visible").and("contain.text", "Total cost required");
    });

    it("Check expense report: invalid Number of liters input", () => {
        fuelExpensesPage.addFuelExpenseButton.click();
        const customIncrement = 300;
        fuelExpensesPage.incrementMileageValue(customIncrement);
        fuelExpensesPage.addExpenseMileage.invoke('val').then((newValue) => {
        cy.log(`Mileage after increment: ${newValue}`);
        });
        fuelExpensesPage.numberOfLiters.clear().type("10000");
        fuelExpensesPage.totalCost.clear().type("1000");  
        fuelExpensesPage.addButton.click({force: true});
        fuelExpensesPage.rangeNumberOfLitersRequired.should("be.visible").and("contain.text", "Liters has to be from 0.01 to 9999");
    });

    it("Check expense report: invalid Total cost input", () => {
        fuelExpensesPage.addFuelExpenseButton.click();
        const customIncrement = 300;
        fuelExpensesPage.incrementMileageValue(customIncrement);
        fuelExpensesPage.addExpenseMileage.invoke('val').then((newValue) => {
        cy.log(`Mileage after increment: ${newValue}`);
        });
        fuelExpensesPage.numberOfLiters.clear().type("200");
        fuelExpensesPage.totalCost.clear().type("2000000");  
        fuelExpensesPage.addButton.click({force: true});
        fuelExpensesPage.rangeTotalCostRequired.should("be.visible").and("contain.text", "Total cost has to be from 0.01 to 1000000");
    });


});