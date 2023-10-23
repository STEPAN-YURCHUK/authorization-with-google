import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { GoogleStrategy } from './strategy/google-auth.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [GoogleAuthController],
    providers: [GoogleAuthService, GoogleStrategy],
    imports: [AuthModule, UserModule]
})

export class GoogleAuthModule {}
