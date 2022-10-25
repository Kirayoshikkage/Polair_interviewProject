describe('Tестирование табов', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/tabs.html');
    cy.viewport(1920, 1080);
  });

  it('Отображение указанного начального таба', () => {
    cy.get('.tabs__body [data-tab=one]').should('be.visible')
  });

  it('Весь контент, кроме активного, скрыт', () => {
    cy.get('.tabs__body [data-tab=one]').should('be.visible')
    cy.get('.tabs__body [data-tab=two]').should('not.be.visible')
  });

  it('Переключение табов с помощью мыши', () => {
    cy.get('.tabs__triggers [data-tab=two]').click()
    cy.get('.tabs__body [data-tab=two]').should('be.visible')
  });

  it('Переключение табов с помощью клавиши Enter', () => {
    cy.get('.tabs__triggers [data-tab=two]').trigger('keydown', { code: 'Enter' });
    cy.get('.tabs__body [data-tab=two]').should('be.visible')
  });

  it('Сообщение об отсутствии не показывается, если контент есть', () => {
    cy.get('.tabs__triggers [data-tab=two]').click()
    cy.get('.tabs__empty-message').should('not.be.visible')
  });

  it('Cообщение об отсутствии показывается, eсли контента нет', () => {
    cy.get('.tabs__triggers [data-tab=three]').click()
    cy.get('.tabs__empty-message').should('be.visible')
  });

  it('Отображение всего контента, когда выбран таб all', () => {
    cy.get('.tabs__triggers [data-tab=all]').click()
    cy.get('.tabs__body [data-tab=one]').should('be.visible')
    cy.get('.tabs__body [data-tab=two]').should('be.visible')
  });

  it('Cообщение об отсутствии не показывается, при выбранном значении all', () => {
    cy.get('.tabs__triggers [data-tab=all]').click()
    cy.get('.tabs__empty-message').should('not.be.visible')
  });
});