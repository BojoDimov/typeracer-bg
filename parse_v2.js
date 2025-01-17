const fs = require('fs');
const path = require('path');
const origFileName = "bible.txt";
const resFileName = "parsed_bible.json";

const text = fs.readFileSync(path.join(__dirname, "src/assets", origFileName)).toString("utf-8");

const it = text.matchAll(/^\d+\. .*/gm);

const result = [];

for (const line of it) {
  result.push(line[0].replaceAll('\"', "'"));
}

fs.writeFileSync(path.join(__dirname, "src/assets", resFileName), JSON.stringify(result, null, 2));