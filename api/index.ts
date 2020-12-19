import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    await axios.get(`https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy?q=${encodeURI(String(req.body.str)) || encodeURI(String(req.query.str))}&color_blindness=0`).then((data) => {
      res.status(200).send(data.data.message.result.notag_html);
    });
  } catch (err) {
    console.error(err);
  }
};
