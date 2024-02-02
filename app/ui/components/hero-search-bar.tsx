"use client";

import { useState } from "react";
import styles from "./hero-search-bar.module.css";
import { FcSearch } from "react-icons/fc";
import { GrOrganization } from "react-icons/gr";
import { RSO } from "@/app/lib/types/util-types";

import { rsos } from "@/scripts/data/placeholders.json";
import { set } from "zod";

export default function HeroSearchBar() {
  const [filteredRSOs, setFilteredRSOs] = useState<RSO[]>(rsos);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setFilteredRSOs(
      rsos.filter((rso) => rso.name.toLowerCase().includes(term))
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <div className={styles.searchBarContent}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for an RSO"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value.toLowerCase());
            }}
          />
          <div className={styles.searchResults}>
            <div className={styles.resultInput} />
            <div
              className={`${styles.resultList} ${
                searchTerm.length !== 0 || styles.searching
              }`}
            >
              {filteredRSOs.map((rso) => (
                <div className={styles.resultItem} key={rso.id}>
                  <GrOrganization className={styles.resultItemIcon} />
                  {rso.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <FcSearch className={styles.searchIcon} />
        <div
          className={styles.searchBtn}
          onClick={() => {
            // console.log(searchTerm);
            setFilteredRSOs([
              ...filteredRSOs,
              {
                id: "1",
                name: searchTerm,
                image:
                  "https://acm.illinois.edu/wp-content/uploads/2020/08/ACM-Logo-White-Text-1.png",
                rating: 4.5,
                numReviews: 0,
              },
            ]);
          }}
        >
          Search
        </div>
      </div>
    </div>
  );
}
