export type SignInFormData = {
  email: string;
  password: string;
};

export type SignInFormError = {
  error?: string;
};

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormError = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  custom?: string[];
};

export type User = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RSO = {
  id: string;
  name: string;
  image: string;
  //   links: string;
  rating: number;
  numReviews: number;
};
