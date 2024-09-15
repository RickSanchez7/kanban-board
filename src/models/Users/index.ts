export interface IUser {
  id: string;
  name: string;
  position: Positions;
}

export enum Positions {
  DEVELOPER = 'Developer',
  MANAGER = 'Manager',
  PRODUCT_OWNER = 'Product Owner',
  DESIGNER = 'Designer',
}
