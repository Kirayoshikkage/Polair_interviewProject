export default function getFontSizeBody() {
  const stylesBody = window.getComputedStyle(document.body);

  return parseFloat(stylesBody.fontSize) || 16;
}
