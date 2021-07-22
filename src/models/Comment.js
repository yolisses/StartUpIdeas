import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class Comment extends Model {
	static init(sequelize) {
		super.init(
			{
				text: DataTypes.STRING,
				user_id: DataTypes.INTEGER,
				idea_id: DataTypes.INTEGER,
			},
			{
				sequelize,
				tableName: 'comments',
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.Idea, { foreignKey: 'idea_id', as: 'idea' });
	}
}

export default Comment;
