

describe('Multi-page Examples test', () => {




  beforeEach(() => {
    cy.visit("/examples")
  })

  it("multi-page testing", () => {
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("eq", "/");

    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("eq", "/fundamentals");

    cy.getDataTest("nav-forms").click();
    cy.location("pathname").should("eq", "/forms");



    // navItems.forEach((item) => {
    //   cy.getDataTest(item.dataTest).click();
    //   cy.location("pathname").should("eq", item.path);
    // })
  })

  it("intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      // body: {
      //   message: "successfully fetched examples"
      // }
      fixture: "example.json"
    }).as("postExamples");

    // cy.getDataTest("post-button").should("be.visible").and("contain.text", "Post Data");
    // cy.wait("@postExamples").its("response.statusCode").should("eq", 200);


  })

  it.only("grudge list", () => {

    cy.contains(/add some grudges/i).should("be.visible")
    cy.getDataTest("clear-button").should("not.exist")
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0)
    })

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("I hate Mondays")
    })

    cy.getDataTest("add-grudge-button").click()

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1)
    })

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("I hate Tuesdays")
    })

    cy.getDataTest("add-grudge-button").click()


    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2)
      cy.get("li").first().should("contain.text", "I hate Mondays")
      cy.get("li").last().should("contain.text", "I hate Tuesdays")
    })
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").first().within(() => {
        cy.get("button").click()
      })
    })
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1)
      cy.get("li").first().should("contain.text", "I hate Tuesdays")
    })
    cy.getDataTest("clear-button").click()
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0)
    })
  })

})
