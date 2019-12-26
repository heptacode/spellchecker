import * as express from "express";
import axios from "axios";
import * as moment from "moment";
import "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as compression from "compression";

import "dotenv/config";

import Log from "./util/logger";

const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(compression());

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.listen(process.env.HTTP_PORT || 80, () => {
	Log.i(`Listening on http://${process.env.HTTP_HOST || "localhost"}:${process.env.HTTP_PORT || 80}`);
});
export default app;
