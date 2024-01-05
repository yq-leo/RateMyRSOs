import styles from "./page.module.css";

import { FcSearch } from "react-icons/fc";
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

function HeroSearchBar() {
  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search for an RSO"
        />
        <FcSearch className={styles.searchIcon} />
        <div className={styles.searchBtn}>Search</div>
      </div>
    </div>
  );
}
