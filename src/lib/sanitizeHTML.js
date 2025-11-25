import DOMPurify from "dompurify";

/*
Sanitizes HTML before rendering in dangerouslySetInnerHTML.
Protects against XSS attacks by stripping unsafe tags, events & scripts.
Takes raw HTML string & returns sanitized HTML string
*/

export const sanitizeHTML = (html) => {
    if (!html) return "";
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },     // allow safe tags only (p, ul, li, strong, br etc.)
    });
};