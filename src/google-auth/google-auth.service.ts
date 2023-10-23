import { TokenService } from '../token/token.service';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleAuthService {

    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    async googleAuth(req) {
        const candidate = await this.userService.findOneByEmail(req.user.email);
		if (candidate) {
			return await this.authService.generateTokenAndTransformUser(candidate);
		}
        const user = await this.userService.createUserForGoogle(req.user.email);
        return await this.authService.generateTokenAndTransformUser(user);
    }
}
