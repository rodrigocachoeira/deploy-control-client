export type Issue = {
  number: Number;
  title: String;
  type: String;
  tags: String[];
  author: {
    email: String;
    image: String;
  };
  approvesCount: Number;
  requestedReviews: {
    back: Boolean;
    front: Boolean;
    infra: Boolean;
  };
}