import {
  json,
  opine,
  urlencoded,
  serveStatic,
} from "https://deno.land/x/opine@1.2.0/mod.ts";
import { opineCors } from "https://deno.land/x/cors@v1.2.1/opineCors.ts";

const app = opine();

app.use(json()); // for parsing application/json
app.use(urlencoded()); // for parsing application/x-www-form-urlencoded
app.use(opineCors());

interface Player {
  name: string;
  score: number;
}

var highscores: Player[] = [];

app.post("/writeScore", function (req, res) {
  const body = req.parsedBody;
  if (
    body["score"] !== undefined && body["score"] !== "" &&
    body["name"] !== undefined && body["name"] !== ""
  ) {
    const p: Player = { name: body["name"], score: parseInt(body["score"]) };

    loadScores().then(() => {
      highscores.push(p);

      const write = Deno.writeTextFile("./scores.json", JSON.stringify(highscores));

      console.log("Writing score:");
      console.log(p);

      write.then(() => {
        res.setStatus(200);
        res.send("received new score");
      });
    });
    
  } else {
    res.setStatus(500);
    res.send("something missing");
  }
});

app.get("/getScores", function (req, res) {
  loadScores().then(() => {
    highscores.sort((a, b) => (b.score - a.score));
    // let top10 = highscores.slice(0, 10);

    console.log("Listing " + highscores.length + " scores");
    // console.log(highscores);

    res.json(highscores);
  });
});

function loadScores() {
  return new Promise<void>((resolve, reject) => {
    const text = Deno.readTextFile("./scores.json");
    text
      .then((response) => highscores = JSON.parse(response))
      .then(resolve)
      .catch((err) => reject(err));
  });
}

app.use(serveStatic("./public"));

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
