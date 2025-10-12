"use client";

import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";
import chatIcon from "@/assets/icons/chat.png";
import fiveStars from "@/assets/images/fivestars.png";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";

export default function CommentWrite() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const { boardId } = useParams<{ boardId: string }>();
  const [createBoardComment, { loading }] = useMutation(CREATE_BOARD_COMMENT);

  const commentCount = comment.length;
  const isDisabled = useMemo(() => {
    return (
      writer.trim().length === 0 ||
      password.trim().length === 0 ||
      comment.trim().length === 0
    );
  }, [writer, password, comment]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled || !boardId) return;
    try {
      await createBoardComment({
        variables: {
          boardId,
          createBoardCommentInput: {
            writer,
            password,
            contents: comment,
            rating: 0,
          },
        },
        refetchQueries: [
          { query: FETCH_BOARD_COMMENTS, variables: { boardId } },
        ],
        awaitRefetchQueries: true,
      });
      setWriter("");
      setPassword("");
      setComment("");
    } catch (error) {
      console.error(error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.commentFrame}>
      <div className={styles.commentBody}>
      <hr className={styles.sectionDivider} />
        <section className={styles.commentContainer} aria-label="댓글 작성">
          <header className={styles.header}>
            <img
              src={chatIcon.src}
              alt="댓글 아이콘"
              className={styles.chatIcon}
            />
            <h3 className={styles.title}>댓글</h3>
          </header>

          <img src={fiveStars.src} alt="별점" className={styles.stars} />

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.fields }>
              <div className={styles.rowInputs}>
                <div className={styles.inputBox}>
                  <label className={styles.label} htmlFor="comment-writer">
                    작성자 <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="comment-writer"
                    className={styles.input}
                    placeholder="작성자 명을 입력해 주세요."
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label className={styles.label} htmlFor="comment-password">
                    비밀번호 <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="comment-password"
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.textareaBox}>
                <textarea
                  className={styles.textarea}
                  placeholder="댓글을 입력해 주세요."
                  maxLength={100}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <span className={styles.counterInBox}>{commentCount}/100</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isDisabled || loading}
              >
                댓글 등록
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
