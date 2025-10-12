"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "./queries";

export function useBoardsDetail() {
  const router = useRouter();
  const { boardId } = useParams<{ boardId: string }>();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });

  const board = data?.fetchBoard;

  const goList = () => router.push("/boards");
  const goEdit = () => router.push(`/boards/${boardId}/edit`);

  return { data, goList, goEdit, board };
}
