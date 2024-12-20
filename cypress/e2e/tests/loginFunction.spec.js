
describe.skip('Login Tests', () => {
    const testEmail = "tklapchenko+1@gmail.com";
    const testPassword = "Password123";
    it('should log in using custom command', () => {
        cy.login(testEmail, testPassword);
    });
});
    