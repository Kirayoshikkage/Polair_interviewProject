export default class DropDownAnimation {
  setsStyleVisibility(container) {
    const body = container.querySelector('.body');
    const content = container.querySelector('.content');

    body.style.cssText = `
      overflow:  ;
      max-height: ${content.scrollHeight}px;
      visibility: visible;
    `;
  }

  setsStyleHiding(container) {
    const body = container.querySelector('.body');

    body.style.cssText = `
      overflow: hidden;
      max-height: 0;
      visibility: hidden;
    `;
  }
}
