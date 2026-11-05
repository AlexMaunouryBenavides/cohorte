import { Link, NavLink } from 'react-router'
import { cx } from '@/shared/lib/cx'
import { paths } from '../paths'
import styles from './Header.module.scss'

const NAV_ITEMS = [
  { to: paths.search(), label: 'Recherche', end: true },
  // TODO(COH-12) : afficher le nombre d'essais de la shortlist dans un badge.
  { to: paths.shortlist(), label: 'Shortlist', end: false },
  { to: paths.insights(), label: 'Analyse', end: false },
]

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={paths.search()} className={styles.logo}>
          <Logo />
          Cohorte
        </Link>
        <nav aria-label="Navigation principale">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => cx(styles.navLink, isActive && styles.active)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="var(--color-primary)" />
      <circle cx="10" cy="11" r="3" stroke="#fff" strokeWidth="2" />
      <circle cx="18" cy="11" r="3" stroke="#fff" strokeWidth="2" />
      <circle cx="14" cy="18" r="3" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}
