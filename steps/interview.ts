// This file will be used to define the expected behavior of every steps you'll define.

import { ITestController } from "../runnerConfiguration/runner";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { defineParameterType } from "@cucumber/cucumber";
import { WEBSITE_INFORMATION } from "../configuration";
import { createPageModel } from "../pageModel/pageModel";

type WebSiteUrls = {
  [key: string]: string;
};

defineParameterType({
  name: "website",
  regexp: /google|facebook|twitter/,
  transformer: (website) => website,
},
);

const webSitesUrl: WebSiteUrls = {
  google: "https://www.google.be/",
  facebook: "https://fr-fr.facebook.com/",
  twitter: "https://twitter.com/"
};

/* GIVENS */

Given(
  "the user opened my website",
  async function (this: ITestController): Promise<void> {
    const page = this.page!;
    await page.goto(WEBSITE_INFORMATION.URL);
  }
);

/* WHENS */

When(
  "the user navigates to {website}",
  async function (this: ITestController, website: string): Promise<void> {
    const page = this.page!;
    await page.goto(webSitesUrl[website]);
  }
);

When(
  "a logged off user navigates to luckygames",
  async function (this: ITestController): Promise<void> {
    const page = this.page!;
    await page.goto("https://www.luckygames.be/");
  }
);

When(
  "the user opens the login form",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
    await pageModel.myWebSite.home.loginButton.isVisible(); 
    await pageModel.myWebSite.home.loginButton.click(); 
  }
);

When(
  "the user fills his username",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
      await pageModel.myWebSite.loginForm.usernameInput.fill(WEBSITE_INFORMATION.USERNAME); 
    }
);


When(
  "the user fills his password",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
      await pageModel.myWebSite.loginForm.passwordInput.fill(WEBSITE_INFORMATION.PASSWORD);
    }
);


When(
  "the user clicks on the login button",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
    await pageModel.myWebSite.loginForm.singInButton.click(); 
  }
);

When(
  "the user goes to the tournament page",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
    await pageModel.luckygames.cookies.accept.click(); 
    await pageModel.luckygames.header.tournament.click(); 
  }
);
When(
  "the user clicks on the tab {tab}",
  async function (this: ITestController, tab: string): Promise<void> {
    const pageModel = createPageModel(this);
    if (tab==="Current and upcoming") {
      await pageModel.luckygames.tab.activeTab.click(); 
    } else {
      await pageModel.luckygames.tab.finishedTab.click(); 
    }
  }
);




/* THENS */

Then(
  "{website} should be displayed",
  async function (this: ITestController, website: string): Promise<void> {
    const page = this.page!;
    await expect(page).toHaveURL(webSitesUrl[website]);
  }
);


Then(
  "the login form should be displayed",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
    await expect(pageModel.myWebSite.loginForm.usernameInput).toBeVisible();
    await expect(pageModel.myWebSite.loginForm.passwordInput).toBeVisible();
  }
);


Then(
  "the dashboard page should be displayed",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
    await expect(pageModel.myWebSite.dashboard.dashboard).toBeVisible();
  }
);

Then(
  "there should be at least 1 tournament displayed",
  async function (this: ITestController): Promise<void> {
    const pageModel = createPageModel(this);
    await expect(pageModel.luckygames.tournamentCard.card).toBeGreaterThanOrEqual(1);
  }
);


