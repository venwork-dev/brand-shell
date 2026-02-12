const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "../styles/default.css");
const dest = path.join(__dirname, "../dist/default.css");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
