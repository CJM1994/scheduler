describe('Navigation', () => {

  it('Should visit Root', () => {
    cy.visit('/');
  });

  it('Should navigate to Tuesday', () => {

    cy.visit('/');

    cy.contains('[data-testid=day]', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');


  });

});