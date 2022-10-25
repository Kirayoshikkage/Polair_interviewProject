describe('Tестирование выпадающей анимации', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/drop-down-animation.html');
    cy.viewport(1920, 1080);
  });

  it('Контент изначально скрыт', () => {
    cy.get('.body').should('not.be.visible')
  });

  it('Показ контента', () => {
    cy.get('.test__trigger').click();
    cy.get('.body').should('be.visible');
  });

  it('Скрытие контента', () => {
    cy.get('.test__trigger').click();
    cy.get('.test__trigger').click();
    cy.get('.body').should('not.be.visible')
  });
});