import styles from "./review-card.module.css";
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GoReport } from "react-icons/go";

export default function ReviewCard({ review }: { review: any }) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <div className={styles.rsoName}>{review.rsoName}</div>
        <div className={styles.ownerActions}>
          <RiEditBoxLine className={styles.actionBtn} />
          <RiDeleteBinLine className={styles.actionBtn} />
        </div>
      </div>
      <div className={styles.review}>
        <div className={styles.rating}>
          <div className={styles.ratingText}>SCORE</div>
          <div className={styles.ratingBox}>{review.rating}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentText}>{review.content}</div>
          <div className={styles.contentActions}>
            <div className={styles.like}>
              <AiOutlineLike className={styles.actionBtn} />
              <span className={styles.numLikes}>{review.numLikes}</span>
            </div>
            <div className={styles.dislike}>
              <AiOutlineDislike className={styles.actionBtn} />
              <span className={styles.numDislikes}>{review.numDislikes}</span>
            </div>
            <div className={styles.report}>
              <GoReport className={styles.actionBtn} />
            </div>
          </div>
        </div>
        <div className={styles.notes}>
          <div className={styles.date}>{review.date}</div>
        </div>
      </div>
    </div>
  );
}
