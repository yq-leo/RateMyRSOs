import styles from "./page.module.css";
import Image from "next/image";
import { RSO } from "@/app/lib/definitions";

import ReviewCard from "@/app/ui/rso/review-card";

const ratingOptions = [5, 4, 3, 2, 1];

export default function Page() {
  const rso = {
    name: "Academic Buzzer Team: A Quiz Bowl Organization",
    id: "1",
    image: "https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.svg",
    overallRating: 4.5,
    ratings: [14, 11, 4, 13, 6],
    numReviews: 100,
  };
  const reviews = [
    {
      id: "1",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repellat temporibus, debitis esse assumenda autem eaque expedita atque asperiores fuga cumque error maxime? Quidem, velit! Quae aliquam quibusdam sunt, provident fugiat nihil id ab ratione fugit saepe vel ex blanditiis error temporibus eligendi cumque doloribus ipsa iusto beatae? Tempore, aperiam?",
      data: "2021-10-10",
      numLikes: 10,
      numDislikes: 1,
      rsoName: "Academic Buzzer Team: A Quiz Bowl Organization",
      date: "2021-10-10",
    },
    {
      id: "1",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus repellat temporibus, debitis esse assumenda autem eaque expedita atque asperiores fuga cumque error maxime? Quidem, velit! Quae aliquam quibusdam sunt, provident fugiat nihil id ab ratione fugit saepe vel ex blanditiis error temporibus eligendi cumque doloribus ipsa iusto beatae? Tempore, aperiam?",
      data: "2021-10-10",
      numLikes: 10,
      numDislikes: 1,
      rsoName: "Academic Buzzer Team: A Quiz Bowl Organization",
      date: "2021-10-10",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.overview}>
        <div className={styles.info}>
          <div className={styles.rating}>
            <span className={styles.overallRating}>{rso.overallRating} </span>/
            5
          </div>
          <div className={styles.description}>
            Rating based on {rso.numReviews} reviews
          </div>
          <div className={styles.title}>
            <Image
              className={styles.logo}
              src={rso.image}
              alt={`logo of ${rso.name}`}
              width={120}
              height={120}
            />
            <div className={styles.name}>{rso.name}</div>
          </div>
          <button className={styles.rateBtn}>Rate</button>
        </div>
        <Distribution ratings={rso.ratings} />
      </div>
      <div className={styles.reviews}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

function Distribution({ ratings }: { ratings: number[] }) {
  const maxRating = Math.max(...ratings);
  return (
    <div className={styles.distribution}>
      <div className={styles.distributionTitle}>Rating Distribution</div>
      <div className={styles.distributionGraph}>
        {ratingOptions.map((rating, idx) => (
          <div key={rating} className={styles.distributionBar}>
            <div className={styles.distributionBarBackground}>
              <div
                className={styles.distributionBarFill}
                style={{
                  height: `${(ratings[idx] / maxRating) * 100}%`,
                }}
              />
            </div>
            <div className={styles.distributionBarLabel}>{rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
