import { state } from '../state/state';
import ServerError from '../utils/ServerError';
import { v4, validate } from 'uuid';
import { UserData } from '../utils/types/interfaces';

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
    const user = {
      id: v4(),
      ...data,
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

    const updatedUser = { ...user, ...data };

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
