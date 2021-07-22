import Comment from '../models/Comment.js';

export default {
	async index(req, res) {
		const { id } = req.params;
		const comments = await Comment.findAll({
			attributes: ['id', 'text', 'updated_at'],
			where: {
				idea_id: id,
			},
			include: { association: 'user', attributes: ['id', 'name'] },
		});
		return res.json(comments);
	},

	async add(req, res) {
		const { id } = req.params;
		const { text } = req.body;
		const { user_id } = req;
		const comment = await Comment.create({ text, user_id, idea_id: id });
		comment.idea_id = parseInt(comment.idea_id);
		return res.json(comment);
	},
};
