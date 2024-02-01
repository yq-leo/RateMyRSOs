import styles from "./rso-card.module.css";
import Image from "next/image";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { RSO } from "@/app/lib/types/util-types";

export default function RSOCard({
  rso,
  liked = false,
}: {
  rso: RSO;
  liked?: boolean;
}) {
  return (
    <div className={styles.main}>
      <Image
        className={styles.logo}
        src={rso.image}
        alt={`logo of ${rso.name}`}
        width="150"
        height="150"
      />
      <div className={styles.info}>
        <div className={styles.rating}>{rso.rating}</div>
        <div className={styles.name}>{rso.name}</div>
        <div className={styles.reviews}>({rso.numReviews} reviews)</div>
      </div>
      <div className={styles.topReview}>
        &quot;Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
        repellat temporibus, debitis esse assumenda autem eaque expedita atque
        asperiores fuga cumque error maxime? Quidem, velit! Quae aliquam
        quibusdam sunt, provident fugiat nihil id ab ratione fugit saepe vel ex
        blanditiis error temporibus eligendi cumque doloribus ipsa iusto beatae?
        Tempore, aperiam?&quot;
      </div>
      <div className={styles.actions}>
        {liked ? (
          <FaBookmark className={`${styles.bookmark} ${styles.liked}`} />
        ) : (
          <FaRegBookmark className={styles.bookmark} />
        )}
      </div>
    </div>
  );
}
