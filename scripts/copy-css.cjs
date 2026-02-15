const fs = require("fs");
const path = require("path");

const assets = [
  {
    src: path.join(__dirname, "../styles/default.css"),
    dest: path.join(__dirname, "../dist/default.css"),
  },
  {
    src: path.join(__dirname, "../schemas/brand-shell.schema.json"),
    dest: path.join(__dirname, "../dist/brand-shell.schema.json"),
  },
];

for (const asset of assets) {
  fs.mkdirSync(path.dirname(asset.dest), { recursive: true });
  fs.copyFileSync(asset.src, asset.dest);
}
