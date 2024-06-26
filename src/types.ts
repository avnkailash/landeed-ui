export interface TimerComponentProps {
  minutes: number;
  onTimeout: () => void;
}

export interface TimeLeft {
  minutes?: number;
  seconds?: number;
}

export interface Form {
  id: string;
  name: string;
  description: string;
  creator: string;
  version: string;
  page_count: number;
  form_timeout: number;
  pages: Page[];
  is_active: boolean;
}

export interface Page {
  name: string;
  fields: Field[];
}

export interface Field {
  id: string;
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  metadata: {
    max_length?: number;
    min_length?: number;
    pattern?: string;
    styles: {
      width: string;
    };
    allow_other?: boolean;
    action?: string;
    min?: number;
    max?: number;
  };
}
