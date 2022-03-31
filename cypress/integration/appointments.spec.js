describe('Appointments', () => {

  beforeEach(() => {
    cy.request('GET', '/api/debug/reset')
      .visit('/')
      .contains('Monday');
  });

  it('Should book an interview', () => {
    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');

    cy.get('[alt="Sylvia Palmer"]')
      .click();

    cy.contains('Save')
      .click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('Should edit an interview', () => {
    cy.get('[alt=Edit]')
      .click({ force: true })

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Connor Mullin')

    cy.get('[alt="Tori Malcolm"]')
      .click();

    cy.contains('Save')
      .click();

    cy.contains('.appointment__card--show', 'Connor Mullin');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('Should delete an interview', () => {

    cy.contains('.appointment__card--show', 'Archie Cohen')
      .should('exist');

    cy.get('[alt=Delete]')
      .click({ force: true });

    cy.contains('Confirm')
      .click();

    cy.get('.appointment__card--status')
      .contains('Deleting...');

    cy.contains('.appointment__card--status', 'Deleting')
      .should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen')
      .should('not.exist');

  });

});
