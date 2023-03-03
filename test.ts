import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import "chromedriver";

const url = "https://duckduckgo.com";
const query = "The dev-friendly football API";
const expectedUrl = "https://www.football-data.org/";

(async () => {
  const options = new Options();

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(url);

    await driver.findElement(By.name("q")).sendKeys(query);
    await driver.findElement(By.id("search_button_homepage")).click();

    const firstResultLinkVisible = until.elementIsVisible(
      driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div[1]/a'))
    );
    await driver.wait(firstResultLinkVisible, 10000);

    const firstResultLink = await driver.findElement(
      By.xpath('//*[@id="rso"]/div[1]/div/div[1]/a')
    );
    await firstResultLink.click();

    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl === expectedUrl) {
      console.log("Test passed!");
    } else {
      console.log(`Expected URL: ${expectedUrl}`);
      console.log(`Actual URL: ${currentUrl}`);
      console.log("Test failed!");
    }
  } finally {
    await driver.quit();
  }
})();