import { UserData } from '../types/interfaces';

export const filterUserFields = (data: UserData) => {
  const allowedFields = ['username', 'age', 'hobbies'];
  const filteredEntries = Object.entries(data).filter((field) => allowedFields.includes(field[0]));
  const filteredData = Object.fromEntries(filteredEntries) as UserData;
  return filteredData;
};
