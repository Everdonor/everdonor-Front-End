import Header from './Header';
import RegisteredUsers from './RegisteredUsers'

function Layout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            {/*<RegisteredUsers />*/}
        </>
    );
}

export default Layout;