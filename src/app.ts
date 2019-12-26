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
app.use(morgan("dev"));
app.use(compression());

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

let tsp: any = moment(new Date()).format("x");

app.post("/", (req, res) => {
	tsp = moment(new Date()).format("x");
	axios
		.get(`https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?_callback=jQuery1124013638432540936685_${tsp}&q=${encodeURI(req.body.origin)}&where=nexearch&color_blindness=0&_=${tsp}`)
		.then(data => {
			console.log(data.data);
			res.send(data.data);
		});
});

app.listen(process.env.HTTP_PORT || 80, () => {
	Log.i(`Listening on http://${process.env.HTTP_HOST || "localhost"}:${process.env.HTTP_PORT || 80}`);
});
export default app;
