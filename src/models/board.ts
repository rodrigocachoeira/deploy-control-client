import { prisma } from "../lib/prisma";
import { Board } from "../../types/models/board";

export async function createOrUpdateBoard(board: Board) {
    if (! board.id) {
        return await createBoard(board);
    }

	const boardinDatabase = await findboard(board.id);

    if (boardinDatabase != null) {
        return await updateBoard(boardinDatabase.id, board);
    }
}

export async function deleteBoard(id: number) {
    return await prisma.board.delete({
		where: {
            id: id
        }
    });
}

export async function findboard(boardId: number) {
    return await prisma.board.findFirst({
		where: {
            id: boardId
        }
    });
}

export async function findBoardByUserId(userId: number) {
    return await prisma.board.findMany({
		where: {
            userId: userId
        }
    });
}

export async function createBoard(board: Board) {
    board.createdAt = new Date();
    board.updatedAt = new Date();

	return await prisma.board.create({
		data: {
            ... board,
        }
    });
}

export async function updateBoard(boardId: number, board: Board) {
	return await prisma.board.update({
		where: {
            id: boardId,
        },
		data: {
            ... board
        }
    });
}