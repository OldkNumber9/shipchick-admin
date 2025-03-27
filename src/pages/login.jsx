import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    // For demo purposes, any login works
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | ByeWind Admin</title>
        <meta name="description" content="ByeWind Admin Dashboard Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src="https://fakeimg.pl/200x80/ff3b30/ffffff?text=ByeWind" alt="ByeWind Logo" width={200} height={80} />
          </div>
        </div>
        
        <h1 className={styles.title}>Admin Login</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@byewind.com"
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input}
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}