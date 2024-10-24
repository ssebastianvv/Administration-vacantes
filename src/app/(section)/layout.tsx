import React, { ReactNode } from 'react';
import styles from './layout.module.scss';
import Title from '@/components/atoms/title/Title';
import { NavBar } from '@/components/organism/nav/navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layoutContainer}>
            <Title className={styles.title} level={2}>Panel De Administracion</Title>
            <NavBar/>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
