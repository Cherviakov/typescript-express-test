import { FilterQuery } from 'mongoose';
import { User, UserDocument } from '../../dataAccess/models/User';
import { UserRepository } from '../../dataAccess/repositories';
import { hash } from '../utilities';

class UserService {
  async findUserByPassword(filter:FilterQuery<UserDocument>):Promise<User | null> {
    const { password } = filter;
    const hashedPassword = hash(password);
    const query = {
      ...filter,
      password: hashedPassword,
    }
    return UserRepository.findOne(query);
  }

  async signupUser(user:User):Promise<User> {
    const { password } = user;
    const hashedPassword = hash(password);
    const userWithHashedPassword = {
      ...user,
      password: hashedPassword,
    }
    return UserRepository.insertOne(userWithHashedPassword);
  }
}

export default new UserService;
