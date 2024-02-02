import styles from "./page.module.css";

import HeroSearchBar from "@/app/ui/components/hero-search-bar";
import TrendingRSOs from "@/app/ui/home/trending-rsos";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>RateMyRSOs</h1>
      <p className={styles.description}>
        Rate your favorite RSOs at
        <span className={styles.uiucOrange}> UIUC</span>
      </p>
      <HeroSearchBar />
      <TrendingRSOs />
    </main>
  );
}
