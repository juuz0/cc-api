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
            await page.waitForSelector('#rankContentDiv')

            let nxtbtn = true;
            let UserSubmissionsArray = []
            while (nxtbtn && count > 0) {
                [UserSubmissionsArray, count] = await page.evaluate((UserSubmissionsArray, count) => {
                    let trs = document.querySelectorAll('.dataTable > tbody > tr')
                    for (tr of trs) {
                        let tds = tr.querySelectorAll('td')
                        let date = tds[0].textContent
                        let problemName = tds[1].textContent
                        let problemLink = tds[1].querySelector('a').href
                        let result = tds[2].querySelector('span').title
                        let language = tds[3].textContent
                        if (count > 0) {
                            UserSubmissionsArray.push({
                                date: date,
                                problemName: problemName,
                                problemLink: problemLink,
                                result: result,
                                language: language
                            })
                            count--;
                        }
                    }

                    return [UserSubmissionsArray, count]
                }, UserSubmissionsArray, count)
                try {
                    const bb = await page.$eval('#rankContentDiv > table > tbody > tr > td:nth-child(3) > a', a => a.onclick.toString());
                    nxtbtn = true;
                }
                catch (er) {
                    console.log(er);
                    nxtbtn = false;
                }

                if (nxtbtn) {
                    await page.$eval('#rankContentDiv > table > tbody > tr > td:nth-child(3) > a', elem => elem.click())
                    await page.waitForTimeout(1000);
                }

            }
            res.json({
                status: "OK",
                res: UserSubmissionsArray
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