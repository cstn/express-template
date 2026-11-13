import { UserResponse } from './dto/get-user.response.ts';
import { User } from './entities/user.ts';

export const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  externalId: user.externalId,
  username: user.username,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});
