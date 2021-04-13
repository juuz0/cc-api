const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://www.codechef.com/users/namitaarya2002'
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
  await page.goto(url, {waitUntil:'domcontentloaded'});
  // await page.screenshot({ path: 'example.png' });
  await page.waitForSelector('.user-details')
  let h = await page.$$eval('.user-details > ul > li', lis=>{
    const UserDetailsArray = []
    for(li of lis){
      const key = li.querySelector('label').textContent
      let val = li.querySelector('span')
      val = val.textContent.replace(/^[0-9]★/g,'')
      if(key.localeCompare('Teams List:')!=0){
      UserDetailsArray.push({
        [key]:val
      })
    }
    }
    return UserDetailsArray
  })
  console.log(h)
  await browser.close();
})();