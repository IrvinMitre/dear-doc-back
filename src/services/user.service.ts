import User from "src/models/user.model";

export default class UserService {
  async getUserById(_id: string) {
    return await User.findById(_id);
  }
}
