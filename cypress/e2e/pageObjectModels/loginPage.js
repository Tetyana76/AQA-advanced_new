class LoginDetails {
    defaultCredentials = {
        username: "guest",
        password: "welcome2qauto",
    }

    navigateToMainPageWithLogin(credentials = this.defaultCredentials) {
        cy.visit('https://qauto.forstudy.space/', { auth: credentials})
    }

}
class LoginPage {
    signInButton() {
    return cy.get('button.btn.btn-outline-white.header_signin', { timeout: 10000 }).should('be.visible');
    }

    signinEmail() {
        return cy.get("input#signinEmail");
    }

    signinPassword() {
        return cy.get("input#signinPassword");
    }

    loginButton() {
        return cy.contains('button', 'Login');
    }

    verifyRedirectToGaragePage() {
        cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
    }

    verifyGaragePageElements() {
        cy.contains("Garage").should("be.visible"); 
    }
}

export { LoginDetails, LoginPage };