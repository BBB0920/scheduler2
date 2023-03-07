describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    //Old Test
    // cy.get("li").contains("Tuesday").click()
    // cy.contains("li", "Tuesday")
    // .should("have.css", "background-color", "rgb(242, 242, 242)");

    //Refactored test
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});