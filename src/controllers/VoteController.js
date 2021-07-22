import Vote from '../models/Vote.js';

import { Sequelize } from 'sequelize';

export default {
	async count(req, res) {
		const { id } = req.params;
		const pos_count = await Vote.count({
			where: {
				idea_id: id,
				is_up: true,
			},
		});
		const neg_count = await Vote.count({
			where: {
				idea_id: id,
				is_up: false,
			},
		});
		return res.json({ count: pos_count - neg_count });
	},

	async countAndVoted(req, res) {
		const { idea_id, user_id } = req.params;
		const pos_count = await Vote.count({
			where: {
				idea_id,
				is_up: true,
			},
		});
		const neg_count = await Vote.count({
			where: {
				idea_id,
				is_up: false,
			},
		});
		console.log({ pos_count, neg_count });
		const vote = await Vote.findOne({
			where: {
				idea_id,
				user_id,
			},
		});
		return res.json({ count: pos_count - neg_count, vote });
	},

	async add(req, res) {
		let { id } = req.params;
		id = parseInt(id);
		const { is_up } = req.body;
		const { user_id } = req;
		console.log({ id, is_up, user_id });
		let vote = await Vote.findOrCreate({
			where: { user_id, idea_id: id },
			defaults: { is_up },
		});
		if (vote.is_up !== is_up) {
			vote = await Vote.update(
				{ is_up },
				{
					where: { user_id, idea_id: id },
				}
			);
		}
		return res.json(vote);
	},

	async remove(req, res) {
		const { id } = req.params;
		const { is_up } = req.body;
		const { user_id } = req;
		console.log({ is_up, user_id, idea_id: id });
		await Vote.destroy({
			where: {
				is_up,
				user_id,
				idea_id: id,
			},
		});
		return res.json({});
	},
};
