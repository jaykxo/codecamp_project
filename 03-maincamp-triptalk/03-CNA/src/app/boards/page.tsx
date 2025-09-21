"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import styles from "./styles.module.css";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      title
      writer
      createdAt
    }
  }
`;

export default function BoardListPage() {
  const { data } = useQuery(FETCH_BOARDS, { variables: { page: 1 } });
  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <div className={styles.header}>
          <div className={styles.noCol}>번호</div>
          <div className={styles.titleCol}>제목</div>
          <div className={styles.authorCol}>작성자</div>
          <div className={styles.dateCol}>날짜</div>
        </div>

        <ul className={styles.list} role="list">
          {data?.fetchBoards.map((board, index) => (
            <li key={board._id} className={styles.row}>
              <div className={styles.noCol}>{index + 1}</div>
              <Link href={`/boards/${board._id}`} className={styles.titleLink}>
                <span className={styles.titleText}>{board.title}</span>
              </Link>
              <div className={styles.authorCol}>
                <span className={styles.chip}>{board.writer}</span>{" "}
              </div>
              <div className={styles.dateCol}>
                <span className={styles.badge}>{board.createdAt}</span>{" "}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
