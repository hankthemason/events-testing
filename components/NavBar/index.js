import Link from "next/link";
import classNames from "classnames";
import MobileMenu from "components/MobileMenu";
import styles from "./NavBar.module.scss";

const NavBar = ({ currentPage }) => {
  const navBarItems = [
    {
      href: "/events",
      name: "Events",
    },
    {
      href: "/calendar",
      name: "Calendar",
    },
    {
      href: "/join",
      name: "Join",
    },
    {
      href: "/about",
      name: "About",
    },
    {
      href: "/contact",
      name: "Contact",
    },
  ];

  return (
    <nav className={styles.nav}>
      <a className={styles.logoLink} href="/">
        <img src="/logo.png" className={styles.logo} />
      </a>
      <MobileMenu menuItems={navBarItems} currentPage={currentPage} />
      <ul className={styles.horizontalMenu}>
        {navBarItems.map((item) => (
          <li
            key={item.name}
            className={classNames(styles.link, {
              [styles.currentPage]: currentPage === item.name,
            })}
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
