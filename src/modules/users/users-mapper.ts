import { UserResponse } from './dto/get-user.response.js';
import { User } from './entities/user.js';

export const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  externalId: user.externalId,
  username: user.username,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});
