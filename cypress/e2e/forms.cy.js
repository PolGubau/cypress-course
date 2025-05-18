


describe('Forms test', () => {




  beforeEach(() => {
    cy.visit("/forms")
  })

  const getInput = () => cy.getDataTest("email-input").find("input").as("email-input")
  const getButton = () => cy.getDataTest("subscribe-button")
  const getOutput = () => cy.getDataTest("output-message")

  it('Contains correct header text', () => {
    cy.getDataTest("forms-title").should("be.visible")
      .and("contain.text", "Testing Forms")
  })


  it("input works if email is valid", () => {

    getInput().should("be.visible")
      .and("have.value", "")
      .type("test@example.com")

    getInput().should("have.value", "test@example.com")

    getOutput().should("not.exist")

    getButton().should("be.visible")
      .and("contain.text", "Subscribe")
      .click()

    getOutput().should("be.visible")
      .and("contain.text", "Successfully subbed: test@example.com!")

    cy.wait(3000) // wait for the message to disappear
    getOutput().should("not.exist")

    cy.get("@email-input").type("{selectall}{backspace}")
    cy.get("@email-input").type("incorrect-email")

    getInput().should("have.value", "incorrect-email")
    getOutput().should("not.exist")
    getButton().should("be.visible")
      .and("contain.text", "Subscribe")
      .click()
    getOutput().should("be.visible")
      .and("contain.text", "Invalid email: incorrect-email!")
    cy.wait(3000) // wait for the message to disappear
    getOutput().should("not.exist")
  })



})
