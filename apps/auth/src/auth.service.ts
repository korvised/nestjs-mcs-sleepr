import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './users/models/user.schema';
import { TokenPayload } from './interface/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION')!,
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('token', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
