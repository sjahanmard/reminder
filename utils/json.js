const fs = require("fs");
const path = require("path");

function readJSONFile(name = "log.json") {
  const filePath = path.join(__dirname, name);

  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2), "utf8");
      return {};
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

function writeJSONFile(data, name = "log.json") {
  const filePath = path.join(__dirname, name);
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}

module.exports = { readJSONFile, writeJSONFile };
