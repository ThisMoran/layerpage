const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    username: { type: DataTypes.STRING, unique: true },
    bio: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    distEmail: { type: DataTypes.STRING },
    mailing: { type: DataTypes.INTEGER, defaultValue: 0 }
})

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    from: { type: DataTypes.STRING, allowNull: false },
    to: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    SenderStarred: { type: DataTypes.BOOLEAN, defaultValue: false },
    ReceiverStarred: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const Link = sequelize.define('link', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false },
})

const Connection = sequelize.define('connection', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    oAuthID: { type: DataTypes.STRING },
    service: { type: DataTypes.STRING },
})

User.hasMany(Message)
User.hasMany(Link)
User.hasMany(Connection)

module.exports = {
    User, Message, Link, Connection
}