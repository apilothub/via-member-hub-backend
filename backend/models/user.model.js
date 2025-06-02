const pool = require('../utils/ConnectDB');
const getAllUsers = async () => {
    try {
        const query = "SELECT * FROM user_profile";
        const [rows] = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
const getUsers = async (id) => {
    try {
        const query = "SELECT * FROM user_profile where id = ?";
        const [rows] = await pool.query(query,[id]);
        return rows;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
module.exports = {getAllUsers, getUsers}