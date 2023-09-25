import { Router } from 'express';
import UsersController from '../../controllers/users';

export class UserRouter {
  user = new UsersController();
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init = () => {
    this.router.post('/login', this.user.login);
  };
}

const userRoutes = new UserRouter();
userRoutes.init();
export default userRoutes.router;
