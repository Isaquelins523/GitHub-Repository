export interface IRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
  };
}
