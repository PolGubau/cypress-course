


describe('Fundamentals test', () => {




  beforeEach(() => {
    cy.visit("/fundamentals")
  })


  it('Contains correct header text', () => {
    cy.getDataTest("fundamentals-title").should("be.visible")
      .and("contain.text", "Testing Fundamentals")
  })

  it("toggles content visibility on click", () => {
    
    const accordionItemButtonTestId = (idx = 1) => `[data-test='accordion-item-${idx}'] div[role='button']`
    
    const accordionItem = (idx = 1) => cy.get(accordionItemButtonTestId(idx)) 


    const contentText = /Your tests will exist in a describe block/i
    const firstParagraph = () => cy.contains(contentText)

    firstParagraph().should("not.be.visible")

    accordionItem(1).click()

    firstParagraph().should("be.visible")

    accordionItem(1).click()
    firstParagraph().should("not.be.visible")
  })
})