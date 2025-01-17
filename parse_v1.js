const fs = require('fs');
const path = require('path');
const origFileName = "bible.txt";

const text = fs.readFileSync(path.join(__dirname, "src/assets", origFileName)).toString("utf-8");
const books = text.split("\n\n\n\n").slice(1).map(s => s.trimStart().trimEnd());

let parseResult = {
  raw: text,
  books: [
    books.map(s => {
      const chapters = s.split("\n\n\nГЛАВА 1.");
      return {
        raw: s,
        title: chapters[0],
        chapters: chapters.slice(1).map(c => {
          return {
            raw: c
            
          }
        })
      }
    })
  ]
}