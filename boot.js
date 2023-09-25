import express from "express";
const app = express();

import bodyParser from "body-parser";

const PORT = process.env.PORT || 5000;
import svcRoutes from "./routes/svc.routes.js";

app.use(bodyParser.json());
svcRoutes(app);

app.listen(PORT, () => {
  console.log(`sy-notification is listening on port ${PORT}`);
});
