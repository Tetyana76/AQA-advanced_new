class Registration {
    // signInButton() {
    //     return cy.get('button.btn.btn-outline-white.header_signin');
    // }

    // signinEmail() {
    //     return cy.get("input#signinEmail");
    // }

    // signinPassword() {
    //     return cy.get("input#signinPassword");
    // }
    
    // loginButton() {
    //     return cy.contains('button', 'Registration'); 
    // }

    registrationButton() {
        return cy.contains('button', 'Registration'); 
    }

    signupName() {
        return cy.get("input#signupName");
    }

    signupLastName() {
        return cy.get("input#signupLastName");
    }

    signupEmail() {
        return cy.get("input#signupEmail");
    }

    signupPassword() {
        return cy.get("input#signupPassword");
    }
    
    signupRepeatPassword() {
        return cy.get("input#signupRepeatPassword");
    }

    nameRequired() {
        return cy.contains('p', 'Name required'); 
    }

    nameInvalid() {
        return cy.contains('p', 'Name is invalid'); 
    }    

    lengthNameRequired() {
        return cy.contains('p', 'Name has to be from 2 to 20 characters long'); 
    }
         
    lastNameRequired() {
        return cy.contains('p', 'Last name required');
    }

    lastNameInvalid() {
        return cy.contains('p', 'Last name is invalid'); 
    }   
    
    lengthLastNameRequired() {
        return cy.contains('p', 'Last name has to be from 2 to 20 characters long'); 
    }

    emailRequired() {
        return cy.get('p').contains('Email required');
    }

    emailIncorrect() {
        return cy.get('p').contains('Email is incorrect');
    }

    passwordRequired() {
        return cy.get('p').contains('Password required');
    }

    passwordInvalid() {
        return cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'); 
    }

    reenterPasswordRequired() {
        return cy.contains('p','Re-enter password required');
    }

    reenterPasswordInvalid() {
        return cy.contains('p', 'Passwords do not match');
    }

    registerButton() {
        return cy.get('button.btn.btn-primary[type="button"]');
    }   


    // verifyRedirectToGaragePage() {
    //     cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
    // }

    // verifyGaragePageElements() {
    //     cy.contains("Garage").should("be.visible"); 
    // }
}

export default Registration;