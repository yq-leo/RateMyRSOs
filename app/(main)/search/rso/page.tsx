import styles from "./page.module.css";
import RSOCard from "@/app/ui/rso-card";
import { RSO } from "@/app/lib/types/util-types";

type SearchParams = {
  query?: string;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const rsos: RSO[] = [
    {
      name: "Academic Buzzer Team: A Quiz Bowl Organization",
      id: "1",
      image: "https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.svg",
      rating: 4.5,
      numReviews: 100,
    },
    {
      name: "Department of Chemical and Biomolecular Engineering Graduate Student Advisory Council University of Illinois at Urbana Champaign",
      id: "2",
      image: "https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.svg",
      rating: 4.5,
      numReviews: 50,
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.summary}>
        {`500 results with "${searchParams?.query}" in their names`}
      </div>
      <div className={styles.results}>
        {rsos.map((rso) => (
          <RSOCard key={rso.id} rso={rso} />
        ))}
      </div>
    </div>
  );
}
