// This file will be used to define the selectors that will be used in your tests
// Locator documentation : https://playwright.dev/docs/api/class-locator
// Example of locator usage : page.locator("CSS selector").click()

import { ITestController } from "../runnerConfiguration/runner";

export const createPageModel = (testController: ITestController) => {
  const page = testController.page!;

  return {
    myWebSite: {
      home: {
        loginButton: page.locator("css=a.HeaderMenu-link--sign-in"),
      },
      loginForm: {
        usernameInput: page.locator("css=input#login_field"),
        passwordInput: page.locator("css=input#password"),
        singInButton: page.locator("css=input.js-sign-in-button")
      },
      dashboard: {
        dashboard: page.locator("css=h3[data-target=\"feed-container.feedTitle\"]")
      }
    },

    luckygames: {
      cookies: {
        accept: page.locator("button#didomi-notice-agree-button"),
      },
      header: {
        tournament: page.locator("css=a[data-testid=\"topnav-tournaments\"]")
      },
      tab : {
        activeTab: page.locator("css=a[data-testid=\"active-tournaments-link\"]"),
        finishedTab: page.locator("css=a[data-testid=\"finished-tournaments-link\"]")
      },
      tournamentCard: {
        card: page.locator("div[data-testid=\"tournament-card\"]")
      }
    }
  };
};
