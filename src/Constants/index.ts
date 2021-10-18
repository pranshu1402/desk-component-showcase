import { DKIcons } from "deskera-ui-library";

/* 
  MENU_ITEM: {
    name,
    icon,
    route?,
    externalRoute?,
    subItems?,
  }
*/

const MENU_ITEMS = [
  {
    name: "Home",
    icon: DKIcons.white.ic_home,
    externalRoute: "http://google.com"
  },
  {
    name: "Company",
    icon: DKIcons.white.ic_company,
    route: "/home-2",
  },
  {
    name: "User",
    icon: DKIcons.white.ic_user,
    subItems: [
      {
        name: "Subscription",
        icon: DKIcons.white.ic_cards,
        route: "/home-3",
      },
      {
        name: "Orders",
        icon: DKIcons.white.ic_cart,
        route: "/home-4",
      },
    ],
  },
  {
    name: "Settings",
    icon: DKIcons.white.ic_settings,
    subItems: [
      {
        name: "Integrations",
        icon: DKIcons.white.ic_repeat,
        route: "/home-5",
      },
      {
        name: "Preferences",
        icon: DKIcons.white.ic_user,
        subItems: [
          {
            name: "Password",
            icon: DKIcons.white.ic_key,
            route: "/home-6",
          },
          {
            name: "Notifications",
            icon: DKIcons.white.ic_notification,
            route: "/home-7",
          },
        ],
      },
    ],
  },
  {
    name: "Menu 8",
    icon: DKIcons.white.ic_company,
    route: "/home-8",
  },
  {
    name: "Menu 9",
    icon: DKIcons.white.ic_company,
    route: "/home-9",
  },
  {
    name: "Menu 10",
    icon: DKIcons.white.ic_company,
    route: "/home-10",
  },
  {
    name: "Menu 11",
    icon: DKIcons.white.ic_company,
    route: "/home-11",
  },
  {
    name: "Menu 12",
    icon: DKIcons.white.ic_company,
    route: "/home-12",
  },
];

const API_URLS = {
  BASE_URL: `https://api-dev.deskera.xyz`,
  GET_ALL_TENANTS: `/v1/users/tenants`,
  GET_TENANT_DETAILS: `/v1/tenants/details`,
  CREATE_NEW_ORG: `/v1/tenants/**/organisationwithoutsetup`,
}

export {MENU_ITEMS, API_URLS};
