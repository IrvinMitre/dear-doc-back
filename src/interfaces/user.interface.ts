export interface UserInterface {
  _id?: string;
  name: string;
  password: string;
  favorites?: Array<String>;
  created_at?: Date;
}
