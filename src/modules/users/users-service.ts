import { Repository } from 'typeorm';

import AppDataSource from '../../database/postgres/database-config.ts';
import { User } from './entities/user.ts';

const getRepository = (): Repository<User> => AppDataSource.getRepository(User);

export const getUser = (id: string) => getRepository().findOneBy({ id });

export const getUserByExternalId = (externalId: string) =>
  getRepository().findOneBy({ externalId });
