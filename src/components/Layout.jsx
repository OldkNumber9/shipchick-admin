import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Dashboard.module.css';

export default function Layout({ children, title }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', active: router.pathname === '/dashboard' },
    { name: 'Terms & Conditions', path: '/dashboard/terms-conditions', active: router.pathname === '/dashboard/terms-conditions' },
    { name: 'Carriers Approval', path: '/dashboard/carriers-approval', active: router.pathname === '/dashboard/carriers-approval' },
    { name: 'Sender Submission', path: '/dashboard/sender-submission', active: router.pathname === '/dashboard/sender-submission' },
    { name: 'Matching Data', path: '/dashboard/matching', active: router.pathname === '/dashboard/matching' },
    { name: 'Payment Approval', path: '/dashboard/payment-approval', active: router.pathname === '/dashboard/payment-approval' },
    { name: 'Incident Support', path: '/dashboard/incident-support', active: router.pathname === '/dashboard/incident-support' },
    { name: 'Express Service', path: '/dashboard/express-service', active: router.pathname === '/dashboard/express-service' },
    { name: 'DATA MANAGER', path: '/dashboard/data-manager', active: router.pathname === '/dashboard/data-manager', isHeader: true },
    { name: 'USER ROLES', path: '/dashboard/user-roles', active: router.pathname === '/dashboard/user-roles', isHeader: true },
    { name: 'PRICE & FEE', path: '/dashboard/price-fee', active: router.pathname === '/dashboard/price-fee', isHeader: true },
    { name: 'PAYMENT', path: '/dashboard/payment', active: router.pathname === '/dashboard/payment', isHeader: true },
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Link href="/dashboard">
            <div className={styles.logo}>
              <Image src="https://fakeimg.pl/40x40/ffffff/ffffff?text=BW" alt="ByeWind" width={40} height={40} />
              <span>ByeWind</span>
            </div>
          </Link>
        </div>
        
        <div className={styles.menuHeader}>Dashboards</div>
        
        <nav className={styles.menu}>
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className={`${styles.menuItem} ${item.active ? styles.active : ''} ${item.isHeader ? styles.menuHeader : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>{title}</h1>
        {children}
      </div>
    </div>
  );
}