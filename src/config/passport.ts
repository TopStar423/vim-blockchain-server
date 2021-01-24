// This is original passport. I think we need to rebuild this.

import { fromPairs } from 'lodash';
import passport from 'passport';
import {Strategy as JwtStrategy,ExtractJwt} from 'passport-jwt';
import { readAuth } from '../lib/lowdb';
import { SECRET } from './config';

// Passport options for passport-jwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: SECRET,
};

/**
 * Passport strategy
 * Checks if jwt matches a user in the database
 * Returns an error if not found
 * Returns the user if found
 */
passport.use(
    'auth',
    new JwtStrategy(opts, async function (
        { username }: { username: string },
        done: any
    ) {
        try {
            const user = readAuth('username');
            const isUser = user == username;

            if (isUser) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

export default passport;
