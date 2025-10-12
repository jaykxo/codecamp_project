import { FETCH_BOARDS, DELETE_BOARD } from "./queries"
import { useQuery, useMutation } from "@apollo/client";
import type React from "react";

export default function useBoardList() {
  const { data } = useQuery(FETCH_BOARDS, { variables: { page: 1 } });
  const [deleteBoard, { loading: deleting }] = useMutation(DELETE_BOARD);

  const onClickDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteBoard({
        variables: { boardId: id },
        refetchQueries: [{ query: FETCH_BOARDS, variables: { page: 1 } }],
        awaitRefetchQueries: true,
      });
      alert("삭제되었습니다!");
    } catch (e: any) {
      alert(e?.message ?? "삭제 중 오류가 발생했습니다.");
    }
  };

  return { data, deleteBoard, onClickDelete };
}
