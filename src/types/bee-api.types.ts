export interface BeeTemplateObject {
  page: {
    title: string;
    description?: string;
    template?: {
      name?: string;
      type?: string;
    };
    body: {
      rows: any[];
      container?: {
        style?: any;
      };
    };
    metadata?: {
      [key: string]: any;
    };
  };
}

export type BeeTemplate = BeeTemplateObject | string;

export interface HtmlConversionResponse {
  template: BeeTemplate;
  status?: string;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: string;
  status?: number;
}

export interface BrandStyleResponse {
  status?: string;
  message?: string;
  json: BeeTemplate;
}
