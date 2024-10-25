import { test as base } from '@playwright/test';

//Login Credentials Data
type LoginData = {
    username: string;
    password: string;
};

export const test = base.extend<LoginData>({
    username: "angelika.strehmel@gmx.de",   
    password: "4567jkj878745",              
});

export { expect } from '@playwright/test';
