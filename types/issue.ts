export type Issue = {
  number: number;
  title: string;
  type?: string;
  tags?: string[];
  board?: string;
  author?: {
      email: string;
      image: string;
  };
  approvesCount?: number;
  requestedReviews?: {
    back: boolean;
    front: boolean;
    infra: boolean;
  };
}