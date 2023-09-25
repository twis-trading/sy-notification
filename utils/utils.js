import moment from "moment";

const generateRandomString = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
};
const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
export default {
  generateRandomString,
  dateNow,
};
