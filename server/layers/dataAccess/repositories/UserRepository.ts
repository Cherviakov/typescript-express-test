import BaseRepository from '../BaseRepository';
import { UserModel, User, UserDocument } from '../models/User';

class UserRepository extends BaseRepository<UserDocument, User> {
  constructor () {
    super(UserModel);
  }
}

export default new UserRepository;
