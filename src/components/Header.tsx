import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header>
            <nav>
                <ul className={styles.header}>
                    <Link to="/shop">Shop</Link>
                    <Link to="/cart">Cart</Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;