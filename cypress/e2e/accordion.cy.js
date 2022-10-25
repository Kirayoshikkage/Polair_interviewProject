describe('Tестирование аккордиона', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/accordion.html');
    cy.viewport(1920, 1080);
  });

  it('До взаимодействия с аккордионом все элементы скрыты', () => {
    cy.get('.accordion__item_one .accordion__content').should('not.be.visible');
    cy.get('.accordion__item_two .accordion__content').should('not.be.visible');
  });

  it('Открытие элемента аккордиона с помощью мыши', () => {
    cy.get('.accordion__item_one .accordion__trigger').click();
    cy.get('.accordion__item_one .accordion__content').should('be.visible');
  });

  it('Закрытие элемента аккордиона с помощью мыши', () => {
    cy.get('.accordion__item_one .accordion__trigger').click();
    cy.get('.accordion__item_one .accordion__trigger').click();
    cy.get('.accordion__item_one .accordion__content').should('not.be.visible');
  });

  it('Открытие элемента аккордиона с помощью клавиши Enter', () => {
    cy.get('.accordion__item_one .accordion__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.accordion__item_one .accordion__content').should('be.visible');
  });

  it('Закрытие элемента аккордиона с помощью клавиши Enter', () => {
    cy.get('.accordion__item_one .accordion__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.accordion__item_one .accordion__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.accordion__item_one .accordion__content').should('not.be.visible');
  });

  it('Может быть открыт только один элемент аккордиона', () => {
    cy.get('.accordion__item_one .accordion__trigger').click();
    cy.get('.accordion__item_two .accordion__trigger').click();
    cy.get('.accordion__item_one .accordion__content').should('not.be.visible');
  });

});
