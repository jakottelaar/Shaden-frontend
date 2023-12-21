describe("template spec", () => {
  it("Successfully register account, navigate to channels page and logout", () => {
    cy.visit("/register");

    cy.get('[data-testid="username-input"]')
      .type("TestUserName")
      .should("have.value", "TestUserName");

    cy.get('[data-testid="email-input"]')
      .type("test@mail.com")
      .should("have.value", "test@mail.com");

    cy.get('[data-testid="password-input"]')
      .type("TestPassword1234")
      .should("have.value", "TestPassword1234");

    cy.get('[data-testid="register-button"]').click();

    cy.url().should("include", "/channels");

    cy.get('[data-testid="settings-modal-button"]').click();

    cy.get('[data-testid="logout-button"]').click();
  });

  it("Successfully login and navigate to channels page", () => {
    cy.visit("/login");

    cy.get('[data-testid="email-input"]')
      .type("test@mail.com")
      .should("have.value", "test@mail.com");

    cy.get('[data-testid="password-input"]')
      .type("TestPassword1234")
      .should("have.value", "TestPassword1234");

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/channels");
  });
});
