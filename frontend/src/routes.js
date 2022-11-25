import Account from "./page/account"
import AccountSettings from "./page/account/Settings/index"
import AccountUsername from "./page/account/Username"
import Docs from "./page/Docs"
import Features from "./page/Features"
import Help from "./page/Help"
import Home from "./page/Home"
import Terms from "./page/Terms"
import UserLayer from "./page/users"
import { DOCS_ROUTE, FEATURES_ROUTE, HELP_ROUTE, HOME_ROUTE, TERMS_ROUTE, USER_ACCOUNT_ROUTE, USER_BIO_ROUTE, USER_CHANGENAME_ROUTE, USER_SETNAME_ROUTE, USER_SETTINGS_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: USER_ACCOUNT_ROUTE,
        Component: <Account />
    },
    {
        path: USER_SETTINGS_ROUTE,
        Component: <AccountSettings />
    },
    {
        path: USER_SETNAME_ROUTE,
        Component: <AccountUsername />
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home />
    }, {
        path: HOME_ROUTE + "/:id",
        Component: <UserLayer />
    },
    {
        path: FEATURES_ROUTE,
        Component: <Features />
    },
    {
        path: HELP_ROUTE,
        Component: <Help />
    },
    {
        path: DOCS_ROUTE,
        Component: <Docs />
    },
    {
        path: TERMS_ROUTE,
        Component: <Terms />
    }
]