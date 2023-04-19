import { Page } from '@playwright/test';
import config from'../configurations/configuration.json'
class cookies{

    constructor(){
        
    }

    // accept cookies in the website 
    static async acceptCookies(page:Page)
    {
        let acceptCookie = page.locator(config.Cookie);
        if(await acceptCookie.isVisible()){
            await acceptCookie.click();
        }
    }

}

export default cookies;