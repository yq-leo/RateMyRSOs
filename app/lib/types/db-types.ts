export type UserSql = {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type RSOSql = {
  id: string;
  name: string;
  emails: string;
  phones: string;
  logo: string;
  links: string;
  ratings: string;
  num_reviews: number;
};

export type ReviewSql = {
  id: string;
  rso_id: string;
  user_id: string;
  comment: string;
  rating: number;
  date: string;
  num_likes: number;
  num_dislikes: number;
};

export type BookMarkSql = {
  rso_id: string;
  user_id: string;
};

export type OpinionSql = {
  user_id: string;
  review_id: string;
  liked: boolean;
};
