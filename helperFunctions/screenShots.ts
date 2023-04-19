import { Page, expect, TestInfo } from '@playwright/test';
import elements from'../helperFunctions/elements';
import files from'./files';
import cookies from './cookies';


class screenshot {
    
    constructor() {
        
    }

    // screenshot comparasion method for the pages 
    static async compareScreenShot(page:Page, linksArray:string[], datafile: string, testInfo:TestInfo){
        let data: string = "";
        let j=0
        for (let i = 0; i < linksArray.length; i++) {
            await page.goto(linksArray[i], {waitUntil:'load'});
            await cookies.acceptCookies(page);
            await page.evaluate(async () => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForLoadState('networkidle');
            await page.evaluate(async () => window.scrollTo(0, 0));
            await elements.ignoredElementElements(page);
            await elements.fixedElements(page);
            let fileName = encodeURI(await page.title());
            let baselineFile = files.getBaselinefolder()+'\\'+fileName+'_baseline.png';

            expect.soft(await page.screenshot({
                fullPage: true,
                animations:'disabled'
            })).toMatchSnapshot(baselineFile)

            if (testInfo.errors.length>j) {
                if(testInfo.errors[j].message?.includes("A snapshot doesn't exist"))
                {
                    data = linksArray[i] + ',Newly created,No,'+ fileName+','+testInfo.errors[j].message;
                }

                else if(testInfo.errors[j].message?.includes("Screenshot comparison failed"))
                {
                    data = linksArray[i] + ',Yes,Yes,'+ fileName+',Screenshot comparison failed';
                }
                
                j++;
            }
            else{
                data = linksArray[i] + ',Yes,Yes,'+ fileName+','+ "Passed";
                
            }
            files.appendToCsv(datafile,data);
        }
    }

    // screenshot comparasion method for elements in side pages 
    static async compareScreenShotForElements(page:Page, linksArray:string[], datafile: string, testInfo:TestInfo, elements:string[]){
        let data: string = "";
        let j=0
        for (let i = 0; i < linksArray.length; i++) {
            await page.goto(linksArray[i], {waitUntil:'load'});
            await cookies.acceptCookies(page);
            await page.evaluate(async () => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForLoadState('networkidle');
            await page.evaluate(async () => window.scrollTo(0, 0));
            for (let index = 0; index < elements.length; index++) {
                const elementList = elements[index].split(',');
                const element = elementList[0];
                const elementName = elementList[1];
                if (await page.locator(element).isVisible()) {
                    
                    let fileName = encodeURI(await page.title())+'_'+ elementName;
                    let baselineFile = files.getBaselinefolder()+'\\'+fileName+'_baseline.png';
    
                    expect.soft(await page.locator(element).screenshot()).toMatchSnapshot(baselineFile)
    
                    if (testInfo.errors.length>j) {
                        if(testInfo.errors[j].message?.includes("A snapshot doesn't exist"))
                        {
                            data = linksArray[i] + ',Newly created,No,'+ fileName+','+testInfo.errors[j].message;
                        }
    
                        else if(testInfo.errors[j].message?.includes("Screenshot comparison failed"))
                        {
                            data = linksArray[i] + ',Yes,Yes,'+ fileName+',Screenshot comparison failed';
                        }
                        
                        j++;
                    }
                    else{
                        data = linksArray[i] + ',Yes,Yes,'+ fileName+','+ "Passed";
                        
                    }
                }else{
                    data = linksArray[i] + ",element isn't visiable,,,"+ "skipped";
                }
                 files.appendToCsv(datafile,data);
            }
        }
    }
}

export default screenshot