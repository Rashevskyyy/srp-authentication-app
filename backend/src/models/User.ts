import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public name!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
