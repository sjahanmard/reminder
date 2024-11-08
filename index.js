require("dotenv").config();
const sleep = require("./utils/sleep");
const email = require("./utils/email");
const { google } = require("googleapis");
const path = require("path");
const schedule = require("node-schedule");
const { isToday, isBetweenTodayAndTomorrow } = require("./utils/time");
const serviceAccountKey = require("./service_account_key");

async function getAllData() {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const range = "Sheet1";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    // const log = readJSONFile();

    const rows = response.data.values;

    if (rows.length) {
      for (let i = 0; i < rows?.length; i++) {
        const row = rows[i];
        if (i === 0 || row.slice(2)?.length <= 0) continue;
        const date = row[0];
        const jalaliDate = row[1];
        const items = row.slice(2);
        if (!isBetweenTodayAndTomorrow(date)) {
          // delete log[i];
          continue;
        }

        // if (!!log[i]) {
        //   // If it's already logged today, return
        //   const now = moment.utc().startOf("day");
        //   const loggedDate = moment.utc(log[i], "MM/DD/YYYY");
        //   const isLoggedToday = loggedDate.isSame(now, "day");
        //   if (isLoggedToday) continue;
        // }

        for (const item of items) {
          await email.send(
            isToday(date) ? "Today" : "Tomorrow",
            item,
            `on ${date}`,
            jalaliDate
          );
          console.log({ i, date, item });
          await sleep(500);
        }
        // log[i] = moment().format("MM/DD/YYYY");
      }
    }
    // writeJSONFile(log);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

const rule = new schedule.RecurrenceRule();
rule.hour = 5;
rule.minute = 0;
rule.tz = "Asia/Tehran";

console.log("Started waiting...");
getAllData();
