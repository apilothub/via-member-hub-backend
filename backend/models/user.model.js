const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommunityMember = sequelize.define('community_members', {
    community_member_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    ten_community_members: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    posts_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    comments_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    current_level_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    points_to_next_level: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
    },
}, {
    tableName: 'community_members',
    timestamps: false,
    indexes: [
        { name: 'idx_email', fields: ['email'] },
        { name: 'idx_ten_community_members', fields: ['ten_community_members'] },
        { name: 'idx_created_at', fields: ['created_at'] },
        { name: 'idx_updated_at', fields: ['updated_at'] },
    ]
});

module.exports = CommunityMember;
