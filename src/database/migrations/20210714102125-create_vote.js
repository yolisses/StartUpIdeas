'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			'votes',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				is_up: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
				user_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'users',
						key: 'id',
					},
				},
				idea_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'ideas',
						key: 'id',
					},
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
				},
			},
			{
				uniqueKeys: {
					actions_unique: {
						fields: ['user_id', 'idea_id'],
					},
				},
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('votes');
	},
};
