import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken:string, profile: Profile, done: VerifyCallback) {
        const {name, emails, photos} = profile
        const user = {
            email: emails[0].value,
            password: null,
            first_name: name.givenName,
            last_name: name.familyName,
            photo: photos[0].value,
        }
        done(null, user)
    }

}