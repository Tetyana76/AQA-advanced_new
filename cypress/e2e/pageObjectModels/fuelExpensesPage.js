class FuelExpensesPage {
    get addFuelExpenseButton() {
        return cy.get('button.car_add-expense').last();
    }

    get addExpenseMileage() {
        return cy.get("input#addExpenseMileage");
    }

    get reportDate() {
        return cy.get("input#addExpenseDate");
    }

    get numberOfLiters() {
        return cy.get("input#addExpenseLiters");
    }

    get totalCost() {
        return cy.get("input#addExpenseTotalCost");
    }

    get addButton() {
        return cy.contains('button', /^Add$/);
    }

    incrementMileageValue(incrementValue) {
        this.addExpenseMileage
            .invoke('val')
            .then((currentValue) => {
                const parsedValue = parseInt(currentValue || 0, 10); 
                const newValue = parsedValue + incrementValue; 

                cy.log(`Current Mileage: ${parsedValue}`); 
                cy.log(`Increment By: ${incrementValue}`); 
                cy.log(`New Mileage: ${newValue}`);

                this.addExpenseMileage.clear().type(newValue.toString()); 
            });

        return this;
    }

    get alertMessage() {
        return cy.contains('p', 'First expense mileage must not be less or equal to car initial mileage. Car initial mileage is');
    }

    get numberOfLitersRequired() {
        return cy.contains('p', 'Liters required');
    }

    get totalCostRequired() {
        return cy.contains('p', 'Total cost required'); 
    }   

    get rangeNumberOfLitersRequired() {
        return cy.contains('p', 'Liters has to be from 0.01 to 9999'); 
    }

    get rangeTotalCostRequired() {
        return cy.contains('p', 'Total cost has to be from 0.01 to 1000000'); 
    }


}

export default FuelExpensesPage; 