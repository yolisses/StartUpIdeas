import Idea from '../models/Idea.js';

import { Sequelize } from 'sequelize';

const amount = 10;

export default {
	// async index(req, res) {
	// 	const { page } = req.params;
	// 	const ideas = await Idea.findAll({
	// 		attributes: [
	// 			'id',
	// 			[Sequelize.literal(`SUBSTRING("title", 1, 100)`), 'title'],
	// 			[Sequelize.literal(`SUBSTRING("description", 1, 100)`), 'description'],
	// 			'updated_at',
	// 		],
	// 		limit: amount,
	// 		offset: amount * (page || 0),
	// 		order: [['id', 'ASC']],
	// 	});
	// 	return res.json(ideas);
	// },

	async index(req, res) {
		const { page } = req.params;
		const ideas = await Idea.findAll({
			attributes: [
				'id',
				[Sequelize.literal(`SUBSTRING("title", 1, 100)`), 'title'],
				[Sequelize.literal(`SUBSTRING("description", 1, 100)`), 'description'],
				'updated_at',
			],
			limit: amount,
			offset: amount * (page || 0),
			order: [['id', 'DESC']],
		});
		return res.json(ideas);
	},

	async get_ids(req, res) {
		const ideas = await Idea.findAll({
			attributes: ['id'],
			limit: 100,
		});
		return res.json(ideas);
	},

	async total_count(req, res) {
		const count = await Idea.count();
		return res.json({ count });
	},

	async findOne(req, res) {
		const { id } = req.params;
		const idea = await Idea.findByPk(id);
		return res.json(idea);
	},

	async add(req, res) {
		const { title, description } = req.body;
		const { user_id } = req;
		console.log('############');
		console.log(user_id);
		const idea = await Idea.create({ title, description, user_id });
		return res.json(idea);
	},
};
