import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

class Idea extends Model {
	static init(sequelize) {
		super.init(
			{
				title: DataTypes.STRING,
				description: DataTypes.STRING,
				user_id: DataTypes.INTEGER,
			},
			{
				sequelize,
				tableName: 'ideas',
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.hasMany(models.Comment, { foreignKey: 'idea_id', as: 'comments' });
		this.hasMany(models.Vote, { foreignKey: 'idea_id', as: 'votes' });
	}
}

export default Idea;
