import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOneOrFail(email);
    const passwordIsMatch = await argon.verify(user.hashed_password, password);

    return passwordIsMatch ? user : new Error('Password is incorect!');
  }

  async login(user: IUser) {
    const { id, email } = user;
    const payload = { id, email };
    return {
      id,
      email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
