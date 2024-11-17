import { LoginDetails } from "../pageObjectModels/loginPage";
import { LoginPage } from '../pageObjectModels/loginPage';
import Registration from "../pageObjectModels/registrationPage";

describe("Registration Form Tests", () => {
    const login = new LoginDetails();
    const registration = new Registration();
    const loginPage = new LoginPage();
    
beforeEach(() => {
    login.navigateToMainPageWithLogin();
    loginPage.signInButton().click();
    registration.registrationButton().click();
});
    
it("Check an error message if 'Name' field is empty and red borders", () => {
    registration.signupName().click();
    registration.registerButton().first().click({force: true});
    registration.nameRequired().should("be.visible").and("contain.text", "Name required");
    registration.signupName()
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message for invalid name input and red borders", () => {
    registration.signupName().clear().type("12345");
    registration.registerButton().first().click({ force: true }); 
    registration.nameInvalid().should("be.visible").and("contain.text", "Name is invalid");
    registration.signupName().clear().type("Тетяна");
    registration.nameInvalid().should("be.visible").and("contain.text", "Name is invalid");   
    registration.signupName().clear().type("!@#$%");
    registration.nameInvalid().should("be.visible").and("contain.text", "Name is invalid");
    registration.registerButton().should("be.disabled");
    registration.signupName()
        .should("have.css", "border-color")
            .and("eq", "rgb(220, 53, 69)");
    });
    
it("Check an error message for name length outside the valid range and red borders", () => {
    registration.signupName().type("A");
    registration.registerButton().first().click({force: true});
    registration.lengthNameRequired().should("be.visible").and("contain.text", "Name has to be from 2 to 20 characters long");
    registration.signupName().clear().type("This Name Is Way Too Long");
    registration.lengthNameRequired().should("be.visible").and("contain.text", "Name has to be from 2 to 20 characters long");
    registration.registerButton().should("be.disabled");
    registration.signupName()
        .should("have.css", "border-color")
            .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message if 'Last Name' field is empty and red borders", () => {
    registration.signupLastName().click();
    registration.registerButton().first().click({force: true});
    registration.lastNameRequired().should("be.visible").and("contain.text", "Last name required");
    registration.signupLastName()
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    });

it("Check an error message for invalid Last Name input and red borders", () => {
    registration.signupLastName().clear().type("12345");
    registration.registerButton().first().click({ force: true }); 
    registration.lastNameInvalid().should("be.visible").and("contain.text", "Last name is invalid");
    registration.signupLastName().clear().type("Шевченко");
    registration.lastNameInvalid().should("be.visible").and("contain.text", "Last name is invalid");   
    registration.signupLastName().clear().type("!@#$%");
    registration.lastNameInvalid().should("be.visible").and("contain.text", "Last name is invalid");
    registration.registerButton().should("be.disabled");
    registration.signupLastName()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)");
    });
    
it("Check an error message for Last Name length outside the valid range and red borders", () => {
    registration.signupLastName().type("B");
    registration.registerButton().first().click({force: true});
    registration.lengthLastNameRequired().should("be.visible").and("contain.text", "Last name has to be from 2 to 20 characters long");
    registration.signupLastName().clear().type("This Last Name Is Too Long");
    registration.lengthLastNameRequired().should("be.visible").and("contain.text", "Last name has to be from 2 to 20 characters long");
    registration.registerButton().should("be.disabled");
    registration.signupLastName()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message if 'Email' field is empty and red borders", () => {
    registration.signupEmail().click();
    registration.registerButton().first().click({ force: true });
    registration.emailRequired().should("be.visible").and("contain.text", "Email required");
    registration.signupEmail()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message for invalid email input and red borders", () => {
    registration.signupEmail().clear().type("invalidemail");
    registration.registerButton().first().click({ force: true });
    registration.emailIncorrect().should("be.visible").and("contain.text", "Email is incorrect");
    registration.signupEmail().clear().type("example@.com");
    registration.emailIncorrect().should("be.visible").and("contain.text", "Email is incorrect");
    registration.signupEmail().clear().type("test@test");
    registration.emailIncorrect().should("be.visible").and("contain.text", "Email is incorrect");
    registration.signupEmail()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)");
    });

it("Check an error message if 'Password' field is empty and red borders", () => {
    registration.signupPassword().click();
    registration.registerButton().first().click({ force: true });
    registration.passwordRequired().should("be.visible").and("contain.text", "Password required");
    registration.signupPassword()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message for invalid password (missing capital letter, missing small letter, missing integer)", () => {
    registration.signupPassword().clear().type("password1");
    registration.registerButton().first().click({ force: true });
    registration.passwordInvalid().should("be.visible").and("contain.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    registration.signupPassword().clear().type("PASSWORD1");
    registration.passwordInvalid().should("be.visible").and("contain.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    registration.signupPassword().clear().type("Password");
    registration.passwordInvalid().should("be.visible").and("contain.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    registration.signupPassword()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message for invalid password length", () => {
    // Password too short
    registration.signupPassword().clear().type("P1");
    registration.registerButton().first().click({ force: true });
    registration.passwordInvalid().should("be.visible").and("contain.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    registration.signupPassword().clear().type("Password123456789");
    registration.passwordInvalid().should("be.visible").and("contain.text", "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    registration.signupPassword()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message if 'Re-enter Password' field is empty", () => {
    registration.signupRepeatPassword().click();
    registration.registerButton().first().click({ force: true });
    registration.reenterPasswordRequired().should("be.visible").and("contain.text", "Re-enter password required");
    registration.signupRepeatPassword()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });

it("Check an error message if passwords do not match", () => {
    registration.signupPassword().clear().type("Password123");
    registration.signupRepeatPassword().clear().type("Password321");
    registration.registerButton().first().click({ force: true });
    registration.reenterPasswordInvalid().should("be.visible").and("contain.text", "Passwords do not match");
    registration.signupRepeatPassword()
        .should("have.css", "border-color")
        .and("eq", "rgb(220, 53, 69)"); 
    });
it("Check that 'Register' button is active when all inputs are valid and creates a new user", () => {
    registration.signupName().clear().type("Tetyana");
    registration.signupLastName().clear().type("Shevchenko");
    registration.signupEmail().clear().type("tklapchenko+2@gmail.com");
    registration.signupPassword().clear().type("Password456");
    registration.signupRepeatPassword().clear().type("Password456");
    registration.registerButton().should("not.be.disabled");
    registration.registerButton().click();
    loginPage.verifyRedirectToGaragePage();
    loginPage.verifyGaragePageElements();
    });

it("Check that 'Register' button is disabled when one or more inputs are invalid", () => {
    // Case 1: Invalid name
    registration.signupName().clear().type("12345"); // Invalid name
    registration.signupLastName().clear().type("Doe");
    registration.signupEmail().clear().type("john.doe@example.com");
    registration.signupPassword().clear().type("Password123");
    registration.signupRepeatPassword().clear().type("Password123");
    registration.registerButton().should("be.disabled");

    // Case 2: Invalid last name
    registration.signupName().clear().type("John");
    registration.signupLastName().clear().type("12345"); // Invalid last name
    registration.signupEmail().clear().type("john.doe@example.com");
    registration.signupPassword().clear().type("Password123");
    registration.signupRepeatPassword().clear().type("Password123");
    registration.registerButton().should("be.disabled");

    // Case 3: Invalid email
    registration.signupName().clear().type("John");
    registration.signupLastName().clear().type("Doe");
    registration.signupEmail().clear().type("invalid-email"); // Invalid email
    registration.signupPassword().clear().type("Password123");
    registration.signupRepeatPassword().clear().type("Password123");
    registration.registerButton().should("be.disabled");

    // Case 4: Invalid password
    registration.signupName().clear().type("John");
    registration.signupLastName().clear().type("Doe");
    registration.signupEmail().clear().type("john.doe@example.com");
    registration.signupPassword().clear().type("pass"); // Invalid password
    registration.signupRepeatPassword().clear().type("pass");
    registration.registerButton().should("be.disabled");

    // Case 5: Passwords do not match
    registration.signupName().clear().type("John");
    registration.signupLastName().clear().type("Doe");
    registration.signupEmail().clear().type("john.doe@example.com");
    registration.signupPassword().clear().type("Password123");
    registration.signupRepeatPassword().clear().type("Password321"); // Passwords do not match
    registration.registerButton().should("be.disabled");
    });
});

    
    