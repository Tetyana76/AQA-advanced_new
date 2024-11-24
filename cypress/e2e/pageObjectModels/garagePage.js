class GaragePage {
    get addCarButton() {
        return cy.contains('button', 'Add car');
    }

    get carBrandDropdown() {
        return cy.get("select#addCarBrand");
    }

    get carModelDropdown() {
        return cy.get("select#addCarModel");
    }

    get addCarMileage() {
        return cy.get("input#addCarMileage");
    }

    get addButton() {
        return cy.contains('button', /^Add$/); 
    }

    verifyCarBrandInList(brand) {
        cy.get('.car-list').should('contain', brand);
    }

    verifyCarModelInList(model) {
        cy.get('.car-list').should('contain', model);
    }

    get mileageInput() {
        return cy.get('input[formcontrolname="miles"]');
    }

    brandOptions = ["Audi", "BMW", "Ford", "Porsche", "Fiat"];

    modelOptions = {
        Audi: ["TT", "R8", "Q7", "A6", "A8"],
        BMW: ["3", "5", "X5", "X6", "Z3"],
        Ford: ["Fiesta", "Focus", "Fusion", "Mondeo", "Sierra"],
        Porsche: ["Cayenne", "911", "Panamera"],
        Fiat: ["Palio", "Ducato", "Panda", "Punto", "Scudo"],
    };

    selectRandomOption(dropdown, options) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        dropdown.select(randomOption);
        return randomOption;
    }

    addCar(mileage) {
        const randomBrand = this.selectRandomOption(this.carBrandDropdown, this.brandOptions);
        const randomModel = this.selectRandomOption(this.carModelDropdown, this.modelOptions[randomBrand]);
        this.addCarMileage.type(mileage);
        this.addButton.click({ force: true });
        return { brand: randomBrand, model: randomModel, mileage: mileage };
    }

    get mileageRequiredMessage() {
    return cy.contains('p', 'Mileage cost required');
    }
}

export default GaragePage; 