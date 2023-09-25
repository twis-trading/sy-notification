import {
  getVerificationCode,
  generateVerificationCode,
  revokeVerficationCode,
} from "../controllers/notification.controller.js";

export default function (app) {
  app.post("/api/notification/getCode", getVerificationCode);
  app.post("/api/notification/generateCode", generateVerificationCode);
  app.post("/api/notification/revokeCode", revokeVerficationCode);
}
