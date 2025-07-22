export interface User {
  name: string;
  passions: number[];
  media: Array<{ id: number; url: string }>;
}
