import UserService from "src/services";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
}

export default UserController;
