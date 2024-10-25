import { expect } from "@playwright/test";

export class LoginPage{
    username: any;
    page: any
    pwd: any
    loginBtn: any
    returnToLoginButton: any
    errorMessage: any
    accept: any
    iframeOuter: any
    loginFailedMsg: any

    constructor(page){

        this.page = page
        this.username = page.locator("#mailInput")
        this.pwd = page.locator("#pwInput")
        this.loginBtn = page.locator("button[data-tr-event-type='userAction']")
        this.returnToLoginButton =  page.locator("//a[normalize-space()='Zurück zum Login']")
        this.errorMessage = page.locator("text=Passwort vergessen")
        this.accept = page.locator("#save-all-pur")
        this.iframeOuter = page.frameLocator("iframe[name='landingpage']")
        this.loginFailedMsg = page.locator("//h1[text()='Anmeldung bestätigen']")

    }

    async acceptAndContinue() {
       await this.iframeOuter.frameLocator("iframe[title='CMP']").locator("#save-all-pur").click(); 
    }

    async goto(){

        await this.page.goto("/")
        await this.acceptAndContinue()
    }

    async login(username, password) {

      await this.page.waitForSelector("#mailInput", {state:'visible'})
        await this.username.fill(username);       
        await this.pwd.fill(password);
        
        await this.loginBtn.click();
        
      }
      async isLoginFailed() {
        const currentUrl = this.page.url();
        return currentUrl.includes('login-failed');
      }
    
      // Check if 'Zurück zum Login' button exists
      async isReturnToLoginButtonVisible() {
     
        await this.page.waitForSelector("//a[normalize-space()='Zurück zum Login']",{state: 'visible'})
        return this.returnToLoginButton.isVisible();
      }
    
      // Click the 'Zurück zum Login' button
      async clickReturnToLogin() {
        await this.returnToLoginButton.click();
      }
    
      // Check if the login button exists on the page
      async isLoginButtonVisible() {
        await this.page.waitForSelector("button[data-tr-event-type='userAction']", {state: 'visible'})
        return this.loginBtn.isVisible();
      }

      async isLoginSuccessfull(){
        
        const currentUrl = this.page.url()
        return currentUrl.includes("logininterceptionfrontend")
      }
    }
    
