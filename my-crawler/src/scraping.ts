import { Dataset, PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, request }) => {
    console.log(`Processing: ${request.url}`);

    const list = await page.locator(
      "#uamods-topics > div > div > div > ul > li"
    );

    const linkList = await list.locator("a").evaluateAll((list) =>
      list.map((element) => ({
        title: element.textContent,
        link: element.getAttribute("href"),
      }))
    );

    console.log(linkList);

    await Dataset.pushData(linkList);
  },
  //   headless: false,
  maxRequestsPerCrawl: 20,
});

await crawler.run(["https://news.yahoo.co.jp/"]);
