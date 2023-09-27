import User from "../../models/user.model";

export default class UserService {
  async getUserById(_id: string) {
    return await User.findById(_id);
  }

  async getUserByName(name: string) {
    return await User.findOne({
      name,
    });
  }

  async updatePokemons(favorites: Array<String>, _id: string) {
    return await User.findOneAndUpdate({_id}, {favorites});
  }

}
