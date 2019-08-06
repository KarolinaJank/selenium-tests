require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Sprawdzam konto.onet.pl', function () {
    let driver;
	
	before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
	
	it('Wpisuje dane użytkownika', async function() {
		
        await driver.get('https://konto.onet.pl/auth.html?app_id=poczta.onet.pl.front.onetapi.pl');
		
		await driver.findElement(By.className('cmp-button_button cmp-intro_acceptAll')).click();
		
        let username = driver.findElement(By.name('login'))
		let password = driver.findElement(By.name('password'))
		
		await username.sendKeys('janek' + Math.random() + '@onet.pl');
		await password.sendKeys('fvgtt');
	 
		await driver.findElement(By.className('loginButton')).click();
		
        let result = await driver.findElement(By.xpath('//*[@id="loginForm"]/div[1]/div/div[1]/strong/span')).getText();
        assert.equal(result, 'Niepoprawny e-mail lub hasło.');
    });
	
	
    after(() => driver && driver.quit());
})