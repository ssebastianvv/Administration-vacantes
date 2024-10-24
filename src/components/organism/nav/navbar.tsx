"use client"
import React from "react";
import { usePathname } from "next/navigation"; 
import { NavBarItemComponent } from "../../molecules/navbar/navItem";
import Input from "@/components/atoms/input/input";
import styles from './nav.module.scss';
import { icons } from '../../atoms/Icons';


const navBarItems = [
  { path: "/vacancy", title: "Vacantes", icon: icons.suitcase, activeClass: styles.activeVacancies }, 
  { path: "/company", title: "Compañia", icon: icons.companie, activeClass: styles.activeCompanies }, 
];

export const NavBar: React.FC = () => {
  const pathname = usePathname(); 

  return (
    <nav className={styles.nav}>
      <div className={styles.linksContainer}>
        {navBarItems.map((item, key) => {
          const isActive = pathname === item.path;
          return (
            <NavBarItemComponent
              key={key}
              path={item.path}
              title={item.title}
              className={isActive ? item.activeClass : ''} 
              icon={item.icon}
            />
          );
        })}
      </div>
      <div className={styles.inputsContainer}>
        { icons.search}
        <Input placeholder="Buscar" className={styles.input} />
      </div>
    </nav>
  );
};

export default NavBar;
