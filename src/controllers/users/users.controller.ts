import { JWT_Response } from "../../interfaces/jwt.interface";
import UserService from "../../services/users/user.service";
import { Request, Response } from "express";
import { isValidObject } from "../../guards/isValidObject.guard";
import { LoginUserDto } from "../../dtos/user/loginUser.dto";
import BaseError from "../../shared/errors/base";
import { ErrorCodes, ErrorMessages } from "../../shared/errors/error";
import { verifyPassword } from '../../utils/passwordUtils';
import { createJWTToken, createJWTRefreshToken } from '../../utils/authUtils';
import { UserInterface } from "../../interfaces/user.interface";

class UsersController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  login = async (
    req: Request,
    res: Response
  ): Promise<Response<JWT_Response> | Error> => {
    
    if (!isValidObject<LoginUserDto>(req.body, ["name", "password"])) {
      return res
        .status(400)
        .send(
          new BaseError(ErrorCodes.BAD_REQUEST, 400, ErrorMessages.BAD_REQUEST)
        );
    }
    try {
      const user = await this.userService.getUserByName(req.body.name);
      if (!user) {
        return res
          .status(404)
          .send(
            new BaseError(
              ErrorCodes.USR_NOT_EXST,
              404,
              ErrorMessages.USR_NOT_EXST
            )
          );
      }
      if (!(await verifyPassword(req.body.password, user.password))) {
        return res
          .status(403)
          .send(
            new BaseError(
              ErrorCodes.USR_PSWRD_FAILED,
              404,
              ErrorMessages.USR_PSWRD_FAILED
            )
          );
      }

      const response: JWT_Response = {
        jwt: createJWTToken(user.toJSON() as UserInterface),
        refresh_jwt: createJWTRefreshToken(user.toJSON() as UserInterface),
      };

      return res.status(200).send(response);
    } catch (error) {
      return res
        .status(500)
        .send(
          new BaseError(
            ErrorCodes.GENERIC_ERROR,
            500,
            ErrorMessages.GENERIC_ERROR
          )
        );
    }
  };
}

export default UsersController;
