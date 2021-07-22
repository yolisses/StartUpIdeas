import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth.js';

import User from '../models/User.js';

const CLIENT_ID =
	'418682635969-4hldgfuc6r8b3d9baaaapkbpblnfj5o8.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400, //one day
	});
}

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: CLIENT_ID,
	});
	const payload = ticket.getPayload();
	return payload;
}

export default {
	async findOne(req, res) {
		const { id } = req.params;
		const user = await User.findOne({ where: { id } });
		if (user) {
			return res.status(200).send({ id: user.id, name: user.name });
		}
		res.status(404).send({ error: 'User not found' });
	},

	async changeName(req, res) {
		const { user_id } = req;
		const { name } = req.body;
		if (!name) {
			return res.status(400).send({ error: 'Attribute name missing' });
		}
		const user = await (await User.findByPk(user_id)).update({ name: name });
		return res.status(200).send({ id: user.id, name: user.name });
	},

	async login(req, res) {
		const { token } = req.body;
		verify(token).then(async (payload) => {
			const email = payload.email;
			console.log(email);

			const foundUser = await User.findOne({ where: { email } });
			if (foundUser) {
				res.send({
					name: foundUser.name,
					id: foundUser.id,
					token: generateToken({ id: foundUser.id }),
				});
				console.log('já possui uma conta');
			} else {
				console.log('ainda não possui uma conta');
				try {
					const user = await User.create({ email: email, name: 'eu' });
					res.send({
						name: user.name,
						id: user.id,
						token: generateToken({ id: user.id }),
					});
				} catch (err) {
					console.log(err);
					res.status(400).send({ error: 'Registration failed' });
				}
			}
		});
	},
};
