import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';

@Controller('google-auth')
export class GoogleAuthController {

    constructor(private googleAuthService: GoogleAuthService) {

    }
    
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async handleRedirect(@Req() req, @Res() res) {
        const user = await this.googleAuthService.googleAuth(req);
        res.cookie('refreshToken', user.token.refresh_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.json(user);
    }
    
}
