export interface CodeSnippet {
  filename: string;
  owner: string;
  repo: string;
  path: string;
  commit_sha: string;
  start_line: string;
  end_line?: string;
  code: string;
  github_permalink: string;
  used_in_latest_docs: boolean;
  updated_at: string;
}

export type ParsedCodeSnippet = CodeSnippet & {
  highlightedCode: TrustedHTML;
  language: string;
};

export interface CodecacheResponse<T> {
  data: T;
  status: "success" | "error";
  status_code: 200 | 400 | 403;
  message?: string;
}

export interface CodecacheSSGProps<T> {
  props: {
    ssg: {
      [github_permalink: string]: T;
    };
  };
}
