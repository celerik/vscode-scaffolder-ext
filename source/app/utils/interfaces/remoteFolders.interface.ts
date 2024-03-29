interface ILinks {
  self: string;
  git: string;
  html: string;
}

export interface IFolder {
  name: string;
  path?: string;
  sha?: string;
  size?: number;
  url?: string;
  html_url?: string;
  git_url?: string;
  download_url?: string;
  type?: string;
  _links?: ILinks;
}

export interface IResult {
  downloadUrl: string;
  path: string;
}
export interface IResultInfo {
  content: any;
  path: string;
}

export interface IDataConfig {
  variables: string[];
  isRelative?: boolean;
  expressions?: Record<string, { case: string; variable: string }>;
}
