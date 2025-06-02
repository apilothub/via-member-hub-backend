const db = require('../utils/ConnectDB.js');

const getAllUsers = async () => {
    try {
        const [results] = await db.promise().query('SELECT * FROM vietnamisawsome.community_members');
        return results;
    } catch (err) {
        throw err;
    }
};

const getUserById = async (id) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM vietnamisawsome.community_members WHERE community_member_id = ?', [id]);
        return results[0];
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getAllUsers,
    getUserById,
};
