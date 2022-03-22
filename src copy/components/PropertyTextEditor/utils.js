const R_HTML_TO_TEMPLATE = /<span[^>]+data-key="([^"]+)"[^>]*>.*?<\/span>\s?<\/span>/g;
const R_TEMPLATE_TO_HTML = /({{[^}]+}})/gm;
const R_NEWLINE_TO_HTML1 = /^$/gm;
const R_NEWLINE_TO_HTML2 = /^(.*)$/gm;
const R_STRIP_TAGS = /<[^>]*>/g;
const R_NEWLINE = /<\/p><p>/gi;
const R_CONTAINS_PROPS = /{{[^}]+}}/gi;
const R_SPACES_BETWEEN_ELEMENTS = /(<\/?\w+>)\s(<)/gi;
const R_HTML_SPACE = /&nbsp;/gi;

/**
 * getQuillEditorHtml
 * @param {string} content
 * @returns {string}
 */
export const getQuillEditorHtml = (inText = '', propertyArr) => {
  const getQuillMention = (match) => {
    const property = propertyArr.find((prop) => !prop.disabled && prop.key === match);
    if (property?.key) {
      const { label, key } = property;
      return `<span class="mention" data-value="${label}" data-key="${key}"  data-denotation-char=""><span class="ql-mention-denotation-char"></span></span>`;
    }
    const proxyValue = match.replace('<', '&lt;').replace('>', '&gt;');
    return `<span class="mention" data-invalid="true" data-value="${proxyValue}" data-key="${match}" data-denotation-char=""><span class="ql-mention-denotation-char"></span></span>`;
  };

  return (inText ?? '')
    .replace(R_NEWLINE_TO_HTML1, '<p><br></p>')
    .replace(R_NEWLINE_TO_HTML2, '<p>$1</p>')
    .replace(R_TEMPLATE_TO_HTML, getQuillMention)
    .replace(R_SPACES_BETWEEN_ELEMENTS, '$1&nbsp;$2'); // to keep spaces accidentally added at the end
};

/**
 * @typedef GetQuillInnerHtmlTextResult
 * @property {string} [html]
 * @property {string} [text]
 * */

/**
 * @param {string} innerHTML
 * @returns {GetQuillInnerHtmlTextResult}
 */
export const getQuillInnerHtmlText = (innerHTML) => {
  const html = innerHTML.replaceAll(R_HTML_TO_TEMPLATE, '$1');
  const text = html
    .replace(R_NEWLINE, '\n')
    .replace(R_STRIP_TAGS, '')
    .replace(R_HTML_SPACE, ' ');

  const containsProperties = text.match(R_CONTAINS_PROPS);

  return {
    html,
    text,
    containsProperties,
  };
};
