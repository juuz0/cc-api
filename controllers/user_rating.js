const puppeteer = require('puppeteer')

module.exports = (req, res) => {
  (async () => {
    const url = 'https://www.codechef.com/users/' + req.query.handle
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage().catch(e => res.json({
      status: "FAILED",
      res: []
    }))
    let count = parseInt(req.query.count) || 12
    console.log(count)
    console.log(req.query)
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 })
      await page.waitForSelector('#cumulative')
      // while (count > 0) {
      //await page.click('#highcharts-mtlstjt-56 > svg > g.highcharts-series-group > g.highcharts-markers.highcharts-series-0.highcharts-line-series.highcharts-tracker > path:nth-child(2)')
      let ll = await page.evaluate(elem =>{
        return elem
      }, (await page.$x('//*[@id="highcharts-mcza9v5-56"]/svg/g[6]/g[2]/path[12]')[0]))
      console.log(ll)
          // let paths = await page.$$eval('#cumulative path.highcharts-point', path=>path)
          // console.log(paths[2].click())
          // for (path of paths) {
          //   path.click()
          //   await page.waitForTimeout(500)
          //   if (count > 0) {
          //     UserRatingArray.push({
          //       Rating: document.querySelector("#cumulative > div.rank-stats > div:nth-child(1) > div > a").textContent,
          //       ChallengeName: document.querySelector("#cumulative > div.rank-stats > div:nth-child(2) > div.contest-name > a").textContent,
          //       GlobalRank: document.querySelector("#cumulative > div.rank-stats > div:nth-child(2) > div:nth-child(2) > strong").textContent
          //     })
          //     count--
          //   }
          // }
      // }
      res.send({
        status: "OK",
        res: UserRatingArray
      })
    }
    catch (e) {
      res.json({
        status: "FAILED",
        res: []
      })
      console.log(e)
    }

    await browser.close();
  })()
}