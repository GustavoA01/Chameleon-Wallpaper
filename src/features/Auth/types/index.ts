export type AuthMode = 'login' | 'register';

export type AuthFormProps = {
  mode: AuthMode;
  nextPath: string;
};
