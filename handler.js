import { parse } from "node:url";
import { DEFAUL_HEADER } from "./util/util.js";
import { data } from "./data/data.js";


function handler(req, res) {
  const { url, method } = req;
  const { pathname } = parse(url, true);
  let chosen;
  if (method.toLowerCase() === "get") {
    if (pathname === "/api/users") {
      chosen = async (req, res) => {
        res.writeHead(200, DEFAUL_HEADER);
        res.write(JSON.stringify(data));
        res.end();
      };
    }
    const id = pathname.split('/').pop()
    if (pathname === `/api/users/${id}`) {
      chosen = async (req, res) => {
        res.writeHead(200, DEFAUL_HEADER);
        const elem = data.find(el => el.id === id)
        res.write(JSON.stringify(elem));
        res.end();
      };
    }
  }
  if (pathname === '*') {
    chosen = (req, res) => {
      res.writeHead(404, DEFAUL_HEADER);
      res.write("not found");
      res.end();
    }
  }
  

  return Promise.resolve(chosen(req, res)).catch(handlerError(res));
}

function handlerError(res) {
  return (error) => {
    console.log("Something bad has", error.stack);
    res.writeHead(500, DEFAUL_HEADER);
    res.write(
      JSON.stringify({
        error: "internet server error",
      })
    );
    return res.end();
  };
}

export default handler;
