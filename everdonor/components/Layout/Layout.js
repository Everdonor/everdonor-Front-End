import MiniDrawer from './Drawer';

function Layout({ children }) {
    return (
        <>
            <MiniDrawer>
                {children}
            </MiniDrawer>
        </>
    );
}

export default Layout;