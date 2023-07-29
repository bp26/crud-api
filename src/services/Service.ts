import { state } from '../state/state';
import ServerError from '../utils/ServerError';
import { v4, validate } from 'uuid';
import { UserData } from '../utils/types/interfaces';
import { validateUserData } from '../utils/helpers/validateUserData';
import { filterUserFields } from '../utils/helpers/filterUserFields';

class Service {
  public getAllUsers() {
    const users = state.users;
    return users;
  }

  public getUser(id: string) {
    if (!validate(id)) {
      throw new ServerError(400, 'UserId is invalid');
    }

    const user = state.users.find((item) => item.id === id);

    if (!user) {
      throw new ServerError(404, `User doesn't exist`);
    }

    return user;
  }

  public createUser(data: UserData) {
    if (!data.username || !data.age || !data.hobbies) {
      throw new ServerError(400, 'All required fields should be filled');
    }

    if (!validateUserData(data)) {
      throw new ServerError(400, 'Some of the fields are filled in incorrectly');
    }

    const user = {
      id: v4(),
      ...filterUserFields(data),
    };
    state.users.push(user);

    return user;
  }

  public updateUser(id: string, data: UserData) {
    if (!validate(id)) {
      throw new ServerError(400, 'UserId is invalid');
    }

    const user = state.users.find((item) => item.id === id);

    if (!user) {
      throw new ServerError(404, `User doesn't exist`);
    }

    if (!validateUserData(data)) {
      throw new ServerError(400, 'Some of the fields are filled in incorrectly');
    }

    const updatedUser = { ...user, ...filterUserFields(data) };

    const users = state.users.map((item) => {
      if (item.id === id) {
        return updatedUser;
      } else {
        return item;
      }
    });
    state.users = users;

    return updatedUser;
  }

  public deleteUser(id: string) {
    if (!validate(id)) {
      throw new ServerError(400, 'UserId is invalid');
    }

    if (!state.users.find((item) => item.id === id)) {
      throw new ServerError(404, `User doesn't exist`);
    }

    const users = state.users.filter((item) => item.id !== id);
    state.users = users;
  }
}

export default new Service();
