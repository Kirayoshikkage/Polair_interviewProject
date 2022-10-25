describe('Tестирование алерта', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/alert.html');
    cy.viewport(1920, 1080);
  });

  it('Алерт изначально скрыт', () => {
    cy.get('.alert').should('not.be.visible');
  });

  it('Открытие алерта при помощи мыши', () => {
    cy.get('.trigger').click();
    cy.get('.alert').should('be.visible');
  });

  it('Открытие алерта при помощи клавиши Enter', () => {
    cy.get('.trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.alert').should('be.visible');
  });

  it('Закрытие алерта при клике вне контента', () => {
    cy.get('.trigger').click();
    cy.get('.alert').click('topRight');
    cy.get('.alert').should('not.be.visible');
  });

  it('Алерт не закрывается при клике по контенту', () => {
    cy.get('.trigger').click();
    cy.get('.alert__body').click();
    cy.get('.alert').wait(600).should('be.visible');
  });

  it('При открытии алерта, блокируется скролл', () => {
    cy.get('.trigger').click();
    cy.get('body').should('have.css', 'overflow', 'hidden')
  });

  it('При закрытии алерта, скролл разблокируется', () => {
    cy.get('.trigger').click();
    cy.get('.alert').click('topRight');
    cy.get('body').should('not.have.css', 'overflow', 'hidden')
  });
});