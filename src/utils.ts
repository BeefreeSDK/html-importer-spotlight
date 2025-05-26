export interface SanitizationResult {
  content: string;
  sanitizedElements: {
    scriptTags: number;
    iframeTags: number;
    javascriptUrls: number;
    dataUrls: number;
    eventHandlers: number;
  };
  originalLength: number;
  sanitizedLength: number;
  wasModified: boolean;
}

export const HtmlSanitizer = {
  sanitize(html: string): SanitizationResult {
    let modifiedHtml = html;
    const result = {
      content: '',
      sanitizedElements: {
        scriptTags: 0,
        iframeTags: 0,
        javascriptUrls: 0,
        dataUrls: 0,
        eventHandlers: 0
      },
      originalLength: html.length,
      sanitizedLength: 0,
      wasModified: false
    };

    result.sanitizedElements.scriptTags = (html.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi) || []).length;
    modifiedHtml = modifiedHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    result.sanitizedElements.iframeTags = (html.match(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi) || []).length;
    modifiedHtml = modifiedHtml.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    
    const jsUrlRegex = /javascript:/gi;
    result.sanitizedElements.javascriptUrls = (html.match(jsUrlRegex) || []).length;
    modifiedHtml = modifiedHtml.replace(jsUrlRegex, 'invalid:');

    const dataUrlRegex = /data:[^;]*;base64,[^"')\\s]+/gi;
    const matches = html.match(dataUrlRegex) || [];
    
    for (const match of matches) {
      if (!match.match(/data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,/i)) {
        result.sanitizedElements.dataUrls++;
        modifiedHtml = modifiedHtml.replace(match, '');
      }
    }
    
    const eventHandlerRegex = /\s(on\w+)=["']?[^"']*["']?/gi;
    let eventMatch;
    
    while (eventMatch = eventHandlerRegex.exec(html)) {
      result.sanitizedElements.eventHandlers++;
      modifiedHtml = modifiedHtml.replace(eventMatch[0], '');
    }
    
    result.content = modifiedHtml;
    result.sanitizedLength = modifiedHtml.length;
    result.wasModified = result.originalLength !== result.sanitizedLength;
    
    return result;
  }
};
