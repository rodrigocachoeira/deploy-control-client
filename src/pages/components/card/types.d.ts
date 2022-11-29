export interface CardProps {
  number: Number;
  type: 'bug' | 'task';
  title: string;
  tags: string[];
  author: {
    email: string;
    image: string;
  },
  approvesCount: Number
  requestedReviews: {
    front: boolean;
    back: boolean;
    infra: boolean;
  },
}