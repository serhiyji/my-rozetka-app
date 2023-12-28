import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="catalog">
                <Link to="">Catalog</Link>
            </Menu.Item>
            <Menu.Item key="all">
                <Link to="/categories/all">All categories</Link>
            </Menu.Item>
            <Menu.Item key="create">
                <Link to="/categories/create">Create category</Link>
            </Menu.Item>
            <Menu.Item key="register">
                <Link to="/auth/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="lxxogin">
                <Link to="/auth/login">Login</Link>
            </Menu.Item>
        </Menu>
    );
};

export default MainMenu;