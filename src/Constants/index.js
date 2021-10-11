import { DKIcons } from "deskera-ui-library";

const MENU_ITEMS = [
  {
    name: "Home",
    icon: DKIcons.white.ic_home,
    route: "/",
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
        // route: "/home-6"
      },
    ],
  },
];

export default MENU_ITEMS;
