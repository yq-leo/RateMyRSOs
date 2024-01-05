import styles from "./rso-card.module.css";
import Image from "next/image";

type RSO = {
  id: String;
  name: String;
  rating: Number;
  numReviews: Number;
};

export default function RSOCard({ rso }: { rso: RSO }) {
  return (
    <div className={styles.card}>
      <Image
        src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.svg"
        alt="rso1"
        width={100}
        height={100}
      />
      <div className={styles.info}>
        <div className={styles.name}>{rso.name}</div>
        <div className={styles.description}>
          <span className={styles.rating}>{String(rso.rating)}</span>{" "}
          <span className={styles.numReviews}>
            ({String(rso.numReviews)} Reviews)
          </span>
        </div>
      </div>
    </div>
  );
}
