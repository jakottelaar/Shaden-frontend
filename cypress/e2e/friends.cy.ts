import { testUser1, testUser2 } from "./test-users-config";

let accessToken1: string = "";
let accessToken2: string = "";

before(() => {
  cy.request("POST", "http://localhost:8080/api/auth/register", testUser1).then(
    (res) => {
      accessToken1 = res.body.results.access_token;
    },
  );

  cy.request("POST", "http://localhost:8080/api/auth/register", testUser2).then(
    (res) => {
      accessToken2 = res.body.results.access_token;
    },
  );
});

after(() => {
  cy.request({
    method: "DELETE",
    url: "http://localhost:8080/api/users/profile",
    headers: {
      Authorization: "Bearer " + accessToken1,
    },
  });

  cy.request({
    method: "DELETE",
    url: "http://localhost:8080/api/users/profile",
    headers: {
      Authorization: "Bearer " + accessToken2,
    },
  });
});

describe("Friends tests", () => {
  it("Successfully send friend request", () => {
    cy.visit("/login");

    cy.get('[data-testid="email-input"]').type(testUser1.email);

    cy.get('[data-testid="password-input"]').type(testUser1.password);

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/channels");

    cy.get('[data-testid="add-friend-modal-button"]').click();

    cy.get('[data-testid="add-friend-modal-input"]').type(testUser2.username);

    cy.get('[data-testid="add-friend-modal-send-button"]').click();

    cy.get('[data-testid="add-friend-modal-response"]').should(
      "contain",
      "Friend request sent successfully",
    );
  });

  it("TestUser2 successfully accepts friend request", () => {
    cy.visit("/login");

    cy.get('[data-testid="email-input"]').type(testUser2.email);

    cy.get('[data-testid="password-input"]').type(testUser2.password);

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/channels");

    cy.get('[data-testid="pending-friends-button"]').click();

    cy.get('[data-testid="pending-friend-request-list-item"]')
      .first()
      .should("contain", testUser1.username);

    cy.get('[data-testid="pending-friend-request-list-item"]')
      .first()
      .find('[data-testid="accept-friend-request-button"]')
      .click();
  });

  it("Testuser2 should have testuser1 as friend", () => {
    cy.visit("/login");

    cy.get('[data-testid="email-input"]').type(testUser2.email);

    cy.get('[data-testid="password-input"]').type(testUser2.password);

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/channels");

    cy.get('[data-testid="all-friends-button"]').click();

    cy.get('[data-testid="friend-list-item"]').should(
      "contain",
      testUser1.username,
    );
  });

  it("Testuser1 should have testuser2 as friend", () => {
    cy.visit("/login");

    cy.get('[data-testid="email-input"]').type(testUser1.email);

    cy.get('[data-testid="password-input"]').type(testUser1.password);

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/channels");

    cy.get('[data-testid="all-friends-button"]').click();

    cy.get('[data-testid="friend-list-item"]').should(
      "contain",
      testUser2.username,
    );
  });

  it("Testuser1 removes testuser2 as friend", () => {
    cy.visit("/login");

    cy.get('[data-testid="email-input"]').type(testUser1.email);

    cy.get('[data-testid="password-input"]').type(testUser1.password);

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/channels");

    cy.get('[data-testid="all-friends-button"]').click();

    cy.get('[data-testid="friend-list-item"]')
      .first()
      .find('[data-testid="friend-user-profile-modal-button"]')
      .click();

    cy.get('[data-testid="remove-friend-button"]').click();
  });
});
