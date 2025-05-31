const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();

// router.get("/one-week-view", async (req, res) => {
//   const url = req.query.url;
//   console.log("INSIDE GET route FOR SCREENSHOT");
//   if (!url) {
//     return res.status(400).send("URL is required");
//   }

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: "networkidle2" });

//     // Wait for 3 seconds to ensure the page has loaded
//     await page.evaluate(
//       () => new Promise((resolve) => setTimeout(resolve, 3000))
//     );

//     const screenshot = await page.screenshot({ encoding: "base64" });
//     await browser.close();
//     res.send({ screenshot });
//   } catch (error) {
//     console.error("Error taking screenshot:", error);
//     res.status(500).send(`Error taking screenshot: ${error.message}`);
//   }
// });

module.exports = router;
