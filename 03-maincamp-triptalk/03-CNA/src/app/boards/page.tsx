import Link from 'next/link';
import styles from './styles.module.css';

export type BoardItem = {
  id: number;
  title: string;
  author: string;
  date: string;
};

const mockPosts: BoardItem[] = [
  { id: 243, title: '제주 삶이 1일차', author: '홍길동', date: '2024.12.16' },
  { id: 242, title: '강남 삶이 100일차', author: '홍길동', date: '2024.12.16' },
  { id: 241, title: '길 걷고 있었는데 고양이한테 간택 받았어요', author: '홍길동', date: '2024.12.16' },
  { id: 240, title: '오늘 날씨 너무 좋아서 바다보러 왔어요~', author: '홍길동', date: '2024.12.16' },
  { id: 239, title: '누가 양양 핫하다고 했어! 나밖에 없는데?', author: '홍길동', date: '2024.12.16' },
  { id: 238, title: '여름에 보드타고 싶은거 저밖에 없나요 😢', author: '홍길동', date: '2024.12.16' },
  { id: 237, title: '사무실에서 과자 너무 많이 먹은거 같아요 다이어트하러 여행 가야겠어요', author: '홍길동', date: '2024.12.16' },
  { id: 236, title: '여기는 기술전 여행이에요 ㅋㅋㅋ', author: '홍길동', date: '2024.12.16' },
  { id: 235, title: '상여금 들어왔는데 이걸로 다낭갈까 사이판 갈까', author: '홍길동', date: '2024.12.16' },
  { id: 234, title: '강릉 여름보다 보기 좋네요', author: '홍길동', date: '2024.12.16' },
];

export default function BoardListPage() {
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
          {mockPosts.map((post) => (
            <li key={post.id} className={styles.row}>
              <div className={styles.noCol}>{post.id}</div>
              <Link href={`/boards/${post.id}`} className={styles.titleLink}>
                <span className={styles.titleText}>{post.title}</span>
              </Link>
              <div className={styles.authorCol}>
                <span className={styles.chip}>{post.author}</span>
              </div>
              <div className={styles.dateCol}>
                <span className={styles.badge}>{post.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
