import styles from "./trending-rsos.module.css";
import RSOCard from "@/app/ui/home/rso-card";

export default function TrendingRSOs() {
  const rsos = [
    {
      id: "1",
      name: "Illini Esports",
      rating: 4.5,
      numReviews: 20,
    },
    {
      id: "2",
      name: "Illini Esports",
      rating: 4.5,
      numReviews: 20,
    },
    {
      id: "3",
      name: "Illini Esports",
      rating: 4.5,
      numReviews: 20,
    },
    {
      id: "4",
      name: "Illini Esports",
      rating: 4.5,
      numReviews: 20,
    },
    {
      id: "5",
      name: "Illini Esports",
      rating: 4.5,
      numReviews: 20,
    },
  ];
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Trending RSOs</h2>
      <div className={styles.rsoList}>
        {rsos?.map((rso) => (
          <RSOCard key={rso.id} rso={rso} />
        ))}
      </div>
    </div>
  );
}
