import { SanitizationResult } from "../types/sanitization.types";

interface SanitizeOperationResult {
    result: string;
    count: number;
}

class HtmlSanitizer {
    public static sanitize(html: unknown): SanitizationResult {
        if (typeof html !== 'string') {
            return {
                content: '',
                sanitizedElements: {
                    scriptTags: 0,
                    iframeTags: 0,
                    javascriptUrls: 0,
                    dataUrls: 0,
                    eventHandlers: 0
                },
                originalLength: 0,
                sanitizedLength: 0,
                wasModified: false
            };
        }

        const originalLength = html.length;
        let sanitized = html;
        const sanitizedElements = {
            scriptTags: 0,
            iframeTags: 0,
            javascriptUrls: 0,
            dataUrls: 0,
            eventHandlers: 0
        };

        // Remove script tags
        const scriptResult = this.removeScriptTags(sanitized);
        sanitized = scriptResult.result;
        sanitizedElements.scriptTags = scriptResult.count;

        // Remove iframe tags
        const iframeResult = this.removeIframeTags(sanitized);
        sanitized = iframeResult.result;
        sanitizedElements.iframeTags = iframeResult.count;

        // Remove javascript: URLs
        const jsUrlResult = this.removeJavascriptUrls(sanitized);
        sanitized = jsUrlResult.result;
        sanitizedElements.javascriptUrls = jsUrlResult.count;

        // Remove data: URLs that could be used for XSS
        const dataUrlResult = this.removeDataUrls(sanitized);
        sanitized = dataUrlResult.result;
        sanitizedElements.dataUrls = dataUrlResult.count;

        // Remove event handlers
        const eventHandlerResult = this.removeEventHandlers(sanitized);
        sanitized = eventHandlerResult.result;
        sanitizedElements.eventHandlers = eventHandlerResult.count;

        const sanitizedLength = sanitized.length;

        return {
            content: sanitized,
            sanitizedElements,
            originalLength,
            sanitizedLength,
            wasModified: originalLength !== sanitizedLength
        };
    }


    /**
     * Removes script tags from HTML content
     */
    private static removeScriptTags(html: string): SanitizeOperationResult {
        const originalHtml = html;
        const sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const count = (originalHtml.match(/<script\b/gi) || []).length;

        return {
            result: sanitized,
            count
        };
    }

    /**
     * Removes iframe tags from HTML content
     */
    private static removeIframeTags(html: string): SanitizeOperationResult {
        const originalHtml = html;
        const sanitized = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
        const count = (originalHtml.match(/<iframe\b/gi) || []).length;

        return {
            result: sanitized,
            count
        };
    }

    /**
     * Removes javascript: URLs from HTML content
     */
    private static removeJavascriptUrls(html: string): SanitizeOperationResult {
        const originalHtml = html;
        const sanitized = html.replace(/javascript:[^\s"']+/gi, '');
        const count = (originalHtml.match(/javascript:[^\s"']+/gi) || []).length;

        return {
            result: sanitized,
            count
        };
    }

    /**
     * Removes data: URLs from HTML content
     */
    private static removeDataUrls(html: string): SanitizeOperationResult {
        const originalHtml = html;
        // Only remove data URLs that could be harmful (keep image data URLs)
        const sanitized = html.replace(/data:(?!image\/)[^\s"']+/gi, '');
        const count = (originalHtml.match(/data:(?!image\/)[^\s"']+/gi) || []).length;

        return {
            result: sanitized,
            count
        };
    }

    /**
     * Removes common event handlers from HTML content
     */
    private static removeEventHandlers(html: string): SanitizeOperationResult {
        const eventHandlers = [
            'onabort', 'onblur', 'onchange', 'onclick', 'ondblclick', 'onerror', 'onfocus',
            'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onmousedown', 'onmousemove',
            'onmouseout', 'onmouseover', 'onmouseup', 'onreset', 'onresize', 'onscroll',
            'onselect', 'onsubmit', 'onunload'
        ];

        let sanitized = html;
        let totalCount = 0;

        eventHandlers.forEach(handler => {
            const regex = new RegExp(` ${handler}="[^"]*"| ${handler}='[^']*'| ${handler}=[^ >]*`, 'gi');
            const matches = sanitized.match(regex) || [];
            totalCount += matches.length;
            sanitized = sanitized.replace(regex, '');
        });

        return {
            result: sanitized,
            count: totalCount
        };
    }
}

// Export the HtmlSanitizer class
export { HtmlSanitizer };
