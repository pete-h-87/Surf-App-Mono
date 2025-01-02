// const express = require("express");
// const puppeteer = require("puppeteer");
// require("dotenv").config();
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const url = req.query.url;
//   if (!url) {
//     return res.status(400).send("URL is required");
//   }

//   try {
//     const browser = await puppeteer.launch({
//       executablePath: process.env.CHROME_PATH || puppeteer.executablePath(),
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: "networkidle2" });

//     await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

//     const screenshot = await page.screenshot({ encoding: "base64" });
//     await browser.close();
//     res.send({ screenshot });
//   } catch (error) {
//     console.error("Error taking screenshot:", error);
//     res.status(500).send(`Error taking screenshot: ${error.message}`);
//   }
// });

// module.exports = router;


const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();

router.get("/screenshot", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for 3 seconds to ensure the page has loaded
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

    const screenshot = await page.screenshot({ encoding: "base64" });
    await browser.close();
    res.send({ screenshot });
  } catch (error) {
    console.error("Error taking screenshot:", error);
    res.status(500).send(`Error taking screenshot: ${error.message}`);
  }
});

module.exports = router;