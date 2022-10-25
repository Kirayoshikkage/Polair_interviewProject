const oneSelectElementDataValue = 'interior-design';
const oneSelectElementTextContent = 'Interior Design';

const twoSelectElementDataValue = 'system-programmer';
const twoSelectElementTextContent = 'System programmer';

describe('Tестирование селекта', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/select.html');
    cy.viewport(1920, 1080);
  });

  it('До взаимодействия с селектом, он скрыт', () => {
    cy.get('.select__content').should('not.be.visible')
  });

  it('Открытие селекта с помощью мыши', () => {
    cy.get('.select__trigger').click();
    cy.get('.select__content').should('be.visible')
  });

  it('Закрытие селекта с помощью мыши', () => {
    cy.get('.select__trigger').click();
    cy.get('.select__trigger').click();
    cy.get('.select__content').should('not.be.visible')
  });

  it('Открытие селекта с помощью клавиши Enter', () => {
    cy.get('.select__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.select__content').should('be.visible')
  });

  it('Закрытие селекта с помощью клавиши Enter', () => {
    cy.get('.select__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.select__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.select__content').should('not.be.visible')
  });

  it('Выбор элемента с помощью мыши', () => {
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${oneSelectElementDataValue}]`).click();
    cy.get('.select__content').should('not.be.visible')
    cy.get('.select__chosen').contains(`${oneSelectElementTextContent}`)
  });

  it('Выбор элемента с помощью клавиши Enter', () => {
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${oneSelectElementDataValue}]`).trigger('keydown', { code: 'Enter' });
    cy.get('.select__content').should('not.be.visible')
    cy.get('.select__chosen').contains(`${oneSelectElementTextContent}`)
  });

  it('При открытии селекта устанавливается фокус на последнем элементе селекта, который был в фокусе', () => {
    cy.get('.select__trigger').click();
    cy.focused().contains(oneSelectElementTextContent)
    cy.get('.select__content').trigger('keydown', { code: 'ArrowDown' });
    cy.get('.select__trigger').click();
    cy.get('.select__trigger').click();
    cy.focused().contains(twoSelectElementTextContent)
  });

  it('Навигация по элементам с помощью клавиши ArrowDown', () => {
    cy.get('.select__trigger').click();
    cy.get('.select__content').trigger('keydown', { code: 'ArrowUp' });
    cy.get('.select__content').trigger('keydown', { code: 'ArrowDown' });
    cy.focused().contains(twoSelectElementTextContent)
  });

  it('Навигация по элементам с помощью клавиши ArrowUp', () => {
    cy.get('.select__trigger').click();
    cy.get('.select__content').trigger('keydown', { code: 'ArrowDown' });
    cy.get('.select__content').trigger('keydown', { code: 'ArrowDown' });
    cy.get('.select__content').trigger('keydown', { code: 'ArrowUp' });
    cy.focused().contains(oneSelectElementTextContent)
  });

  it('Выбранный элемент нельзя выбрать еще раз', () => {
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${oneSelectElementDataValue}]`).click();
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${oneSelectElementDataValue}]`).click();
    cy.get('.select__content').should('be.visible')
  });
});