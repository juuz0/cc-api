const puppeteer = require('puppeteer');


module.exports = (req,res)=>{
    (async () => {
        const url = 'https://www.codechef.com/users/' + req.query.handle
          const browser = await puppeteer.launch({args: ['--no-sandbox']})
          const page = await browser.newPage().catch(e=>res.json({
              status:"FAILED",
              res:[]
          }))
        try{
        await page.goto(url, {waitUntil:'domcontentloaded',timeout:0})
        await page.waitForSelector('.user-details')
        let h = await page.$$eval('.user-details > ul > li', lis=>{
          const UserDetailsArray = []
          UserDetailsArray.push({
            Name : document.querySelector('.user-details-container > header').innerText
          })
          UserDetailsArray.push({
            Rating : document.querySelector('.rating-number').textContent
          })

          
          for(li of lis){
            const key = li.querySelector('label').textContent.replace(/:$/g,'')
            let val = li.querySelector('span')
            val = val.textContent.replace(/^[0-9]★/g,'')
           
            if(key.localeCompare('Teams List')!=0){
            UserDetailsArray.push({
              [key]:val
            })
          }
          }
          return UserDetailsArray
        })
        res.json({
            status:"OK",
            res:h
        })
      }
      catch(e){
        res.json({
          status:"FAILED",
          res:[]
      })
      }
        await browser.close();
      })()
}

