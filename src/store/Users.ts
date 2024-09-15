import { create } from 'zustand';
import { IUser } from '../models/Users';
import { mockUsers } from '../mocks';

interface UsersState {
  users: IUser[];
  addUser: (user: IUser) => void;
  getUsers: () => IUser[];
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [...mockUsers],
  addUser: (user: IUser) =>
    set(state => {
      const users = [...state.users, user];

      localStorage.setItem('users', JSON.stringify(users));
      return { users };
    }),
  getUsers: () => get().users,
}));
