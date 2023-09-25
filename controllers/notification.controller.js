import {
  getCode,
  generateCode,
  revokeCode,
} from "../services/notification.service.js";
import model from "../models/response.model.js";

const getVerificationCode = async (req, res) => {
  getCode(req.body, (isSuccess, data) => {
    isSuccess
      ? res.status(200).send({ ...model.successModel, message: data })
      : res.status(401).send({ ...model.failModel, message: data });
  });
};

const generateVerificationCode = async (req, res) => {
  generateCode(req.body, (isSuccess, data) => {
    isSuccess
      ? res.status(200).send({ ...model.successModel, message: data })
      : res.status(401).send({ ...model.failModel, message: data });
  });
};

const revokeVerficationCode = async (req, res) => {
  revokeCode(req.body, (isSuccess, data) => {
    isSuccess
      ? res.status(200).send({ ...model.successModel, message: data })
      : res.status(401).send({ ...model.failModel, message: data });
  });
};

export { getVerificationCode, generateVerificationCode, revokeVerficationCode };
