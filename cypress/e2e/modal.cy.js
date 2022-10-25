describe('Tестирование модального окна', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/modal.html');
    cy.viewport(1920, 1080);
  });

  it('Закрытие модального окна с помощью мыши', () => {
    cy.get('.trigger').click();
    cy.get('.modal__close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('Закрытие модального окна с помощью клавиши Enter', () => {
    cy.get('.trigger').click();
    cy.get('.modal__close').trigger('keyup', { code: 'Enter' });
    cy.get('.modal').should('not.be.visible');
  });
});