import AppNavigationBars from './AppNavigationBars';

function Layout({ children }) {
    return (
        <>
            <AppNavigationBars>
                {children}
            </AppNavigationBars>
        </>
    );
}

export default Layout;