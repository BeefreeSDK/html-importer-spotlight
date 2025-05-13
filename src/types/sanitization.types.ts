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
