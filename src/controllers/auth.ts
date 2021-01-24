import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
import { readAuth } from '../lib/lowdb';
import {User} from '../models/User';

module.exports = {
    /**
     * Register Route
     * Accepts username, password in request body
     * level is currently an arbitrary parameter set to 0, to be user later
     */
    register: async (req, res) => {
        let user;
        try {
            user = await new User({ ...req.body, level: 0 }).save();
        } catch (e) {
            return res.status(400).send(e.toString());
        }
        return res.status(200).send(user.toJSON());
    },

    /**
     * Login Route
     * Accepts username, password in request body
     * Checks whether there's a matching record in the database
     * Rejects with error status 400 and a message if not found
     * Accepts with user record and a signed JWT
     */

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = readAuth('username');
            const pass = readAuth('password');
            if (user == username && (await compare(password, pass))) {
                const token = jwt.sign({ username: user, password: pass }, SECRET);
                return res.status(200).send({ jwt: `Bearer ${token}` });
            }

            throw new Error('passwords dont match');
        } catch (e) {
            return res.status(400);
        }
    }
}
