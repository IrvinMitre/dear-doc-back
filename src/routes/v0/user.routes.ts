import { Router } from 'express';
import UserController from '../../controllers/user';

export class UserRouter {
  user = new UserController();
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
