export interface BeeTemplate {
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
