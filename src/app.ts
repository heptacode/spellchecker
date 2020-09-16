import * as express from "express";
import axios from "axios";

import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as compression from "compression";

import "dotenv/config";

import Log from "./util/logger";

const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    await axios.get(`https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?q=${encodeURI(req.query.q)}&color_blindness=0`).then(data => {
      res.send(data.data.message.result.notag_html);
    });
  } catch (err) {
    Log.e(err);
  }
});

app.listen(process.env.HTTP_PORT || 80, () => {
  Log.i(`Listening on http://${process.env.HTTP_HOST || "localhost"}:${process.env.HTTP_PORT || 80}`);
});
export default app;
