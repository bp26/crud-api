import { UserData } from '../types/interfaces';

export const validateUserData = ({ username, age, hobbies }: UserData) => {
  if (username && typeof username !== 'string') {
    return false;
  }

  if (age && typeof age !== 'number') {
    return false;
  }

  if (hobbies && (!Array.isArray(hobbies) || hobbies.find((item) => typeof item !== 'string'))) {
    return false;
  }

  return true;
};
