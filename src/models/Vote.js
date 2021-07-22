import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class Vote extends Model {
	static init(sequelize) {
		super.init(
			{
				is_up: DataTypes.BOOLEAN,
				user_id: DataTypes.INTEGER,
				idea_id: DataTypes.INTEGER,
			},
			{
				sequelize,
				tableName: 'votes',
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.Idea, { foreignKey: 'idea_id', as: 'idea' });
	}
}

export default Vote;
