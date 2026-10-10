export interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  description: string | null;
  language: string | null;
}