import Admin from "../admin";
import MainNavigation from "../mainNavBar/mainNavBar";

function Layout({ children, session }: { children: any, session: any }) {
    return (
        <main id="content">
            {session?.auth ? <Admin user={session.user}/> : <MainNavigation />}
            {children}
        </main>

    );
}

export default Layout;