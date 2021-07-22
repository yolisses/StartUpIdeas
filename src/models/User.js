import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

import Comment from './Comment.js';
class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: DataTypes.STRING,
				email: DataTypes.STRING,
			},
			{
				sequelize,
				tableName: 'users',
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Idea, { foreignKey: 'user_id', as: 'ideas' });
		this.hasMany(models.Vote, { foreignKey: 'user_id', as: 'votes' });
	}
}

export default User;
