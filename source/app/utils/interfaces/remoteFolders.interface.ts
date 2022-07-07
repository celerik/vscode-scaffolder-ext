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
