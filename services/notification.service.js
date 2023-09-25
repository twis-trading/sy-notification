import { pool } from "../config/database.config.js";
import utils from "../utils/utils.js";

const getCode = async (data, callback) => {
  try {
    const query = `SELECT id, payload, imei, code, isValid, createdAt, updatedAt FROM code_list WHERE payload= ? AND imei= ? AND isValid = 1`;
    const [rows] = await pool.query(query, [data.payload, data.imei]);
    return rows.length > 0
      ? callback(true, rows[0])
      : callback(false, "Valid code not found");
  } catch (error) {
    console.error("Error in getCode", error);
    callback(false, error);
  }
};

const generateCode = async (data, callback) => {
  console.log("data", data);
  const isExisting = await handleCheckUser(data);
  console.log("isExisting", isExisting);
  if (isExisting) {
    console.log("User is existing");
    // callback(true, isExisting);
    const isGenerate = await handleCodeGeneration(data);
    callback(true, isGenerate);
  } else {
    callback(false, "Generation of code failed because of non existing user");
  }
};
const handleCheckUser = async (data) => {
  try {
    const query = `SELECT id, payload, imei, name, phone, email, address, status, createdAt, updatedAt FROM app_users WHERE payload= ? AND imei= ?`;
    const [rows] = await pool.query(query, [data.payload, data.imei]);
    return rows.length > 0 ? rows[0] : false;
  } catch (error) {
    console.error("Error in handleCheckUsername", error);
    return false;
  }
};
const handleCodeGeneration = async (data) => {
  try {
    const query = `INSERT INTO code_list(payload, imei, code) VALUES (?,?,?)`;
    const [rows] = await pool.query(query, [
      data.payload,
      data.imei,
      utils.generateRandomString(),
    ]);
    return rows.affectedRows == 1 ? true : false;
  } catch (error) {
    console.error("Error in handleCodeGeneration", error);
    return false;
  }
};
const revokeCode = async (data, callback) => {
  try {
    const query = `UPDATE code_list SET isValid='0', updatedAt="${utils.dateNow}" WHERE payload= ? AND imei= ? AND code=?`;
    const [rows] = await pool.query(query, [
      data.payload,
      data.imei,
      data.code,
    ]);
    rows.affectedRows == 1
      ? (callback(true, rows.info),
        console.log(`revokeCode successful: ${data.payload}`))
      : (callback(false, "revokeCode failed, code not found"),
        console.log(`revokeCode failed code not found ${data.payload}`));
  } catch (error) {
    console.error("Error in revokeCode", error);
    callback(false, error);
  }
};
export { getCode, generateCode, revokeCode };
