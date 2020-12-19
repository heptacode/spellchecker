import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    let data = await axios.get("https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy", { params: { q: req.body ? String(req.body.str) : String(req.query.str), color_blindness: 0 } });
    res.status(200).send(data.data.message.result.notag_html);
  } catch (err) {
    console.error(err);
  }
};
