import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "a", "p", "br", "strong", "em", "b", "i", "u", "s", "small", "sub", "sup",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "dl", "dt", "dd",
  "blockquote", "code", "pre",
  "hr", "div", "span",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
  "img", "figure", "figcaption", "picture", "source",
  "section", "article", "aside", "header", "nav",
];

const ALLOWED_ATTR = [
  "href", "title", "alt", "src", "srcset", "sizes", "loading", "decoding", "fetchpriority",
  "id", "class", "rel", "target",
  "width", "height",
  "colspan", "rowspan", "scope",
  "datetime", "type", "media",
];

export function sanitizeBlogHtml(input: string): string {
  if (!input) return "";
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "button", "textarea", "select"],
    FORBID_ATTR: ["style", "onerror", "onclick", "onload"],
  });
}
