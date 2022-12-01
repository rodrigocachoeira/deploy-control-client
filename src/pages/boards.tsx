import Navbar from './layout/navbar';

import { Heading } from './components/heading';
import { useEffect, useState } from "react";
import { Board } from "../../types/board";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Payload } from '../../types/jwt/payload';
import { loadJwtTokenInSession } from "../services/auth";
import { destroy, post } from '../services/http/fetch';
import { openJwtToken } from "../lib/jwt";
import { findBoardByUserId } from "../models/board";

const BOARDS = [
    {
        key: 'ANDROMEDA',
		value: 'Andrômeda'
    },
	{
        key: 'CALISTO',
		value: 'Calisto'
	},
	{
        key: 'MARTE',
		value: 'Marte'
	},
	{
        key: 'PLUTAO',
		value: 'Plutão'
	},
	{
        key: 'TERRA',
		value: 'Terra'
	},
];

export default function Boards({...data}) {
    const [board, setBoard] = useState("");
    const [boards, setBoards] = useState<Board[]>([]);
    const [user, setUser] = useState<Payload | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const payload = loadJwtTokenInSession(undefined);

        setUser({
			id: payload.id,
			email: payload.email
        });

        setBoards(
			data.boards.map((board: any) => {
				return {
                  	id: board.id,
					data: {
                          key: board.internal,
						  value: board.description
                     },
					status: board.status,
					sprint: 0
                };
			})
        )

	}, []);

    function handleBoardInput (event: any) {
        setBoard(event.target.value);
    }

    function registerBoardClasses() {
        const classes = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ';
        const disabledClasses = 'rounded opacity-50 cursor-not-allowed';

        if (board === "") {
			return classes + disabledClasses;
        }

        return classes;
    }

	function updateBoardClasses() {
        const classes = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ';
        const disabledClasses = 'rounded opacity-50 cursor-not-allowed';

        if (loading) {
            return classes + disabledClasses;
        }

		return classes;
    }

	function removeBoardClasses() {
        const classes = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ';
        const disabledClasses = 'rounded opacity-50 cursor-not-allowed';

        if (loading) {
            return classes + disabledClasses;
        }

		return classes;
    }

	function storeBoard() {
        const selectedBoard = BOARDS.filter(b => b.key === board)[0];

        if (! selectedBoard) {
            return;
        }

        const newBoard ={
            data: { ... selectedBoard },
			status: "",
			sprint: 0,
		};

        setBoards(
			boards => [...boards, newBoard]
        );
        setBoard("");
    }

	function handleBoardState(e: any, key: string) {
        const status = e.target.value as string;
        const updatedBoards: Board[] = boards.map((board: Board) => {
            if (board.data.key == key) {
				board.status = status;
            }

			return board;
        });

        setBoards(updatedBoards);
    }

	function handleBoardSprint(e: any, key: string) {
        const sprint = e.target.value as number;
        const updatedBoards: Board[] = boards.map((board: Board) => {
            if (board.data.key == key) {
                board.sprint = sprint;
            }

			return board;
        });

        setBoards(updatedBoards);
    }

	async function removeBoard(e: any, board: Board) {
        if (! user) {
            return;
        }

        setLoading(true);

        await destroy(undefined, '/api/boards/destroy', {
            id: board.id,
		});

        const updatedBoards: Board[] = boards.filter((b: Board) => {
            return b.data.key !== board.data.key;
        });

        setBoards(updatedBoards);
        setLoading(false);
    }

	async function updateBoard(e: any, board: Board) {
        if (! user) {
        	return;
        }

		setLoading(true);
		const res = await post(undefined, '/api/boards/store', {
            id: board.id as number,
			internal: board.data.key,
			description: board.data.value,
			status: board.status,
			userId: user.id,
        });
        const { data } = await res.json();

        if (! data.id) {
			return;
        }

        const updatedBoards: Board[] = boards.map((board: Board) => {
            if (board.data.key == data.internal) {
                board.id = data.id;
            }

			return board;
        });

        setBoards(updatedBoards);
        setLoading(false);
    }

    return (
		<section className="min-h-full">
			<Navbar />
			<header className="bg-white shadow">
				<Heading title="Settings" />
            </header>

			<div className="divide-y" ></div>

			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<h6 className="text-lg font-bold dark:text-white">Board</h6>

					<div className="grid grid-cols-2 gap-4 w-1/2 mt-5" >
						<div className="grid">
							<select onChange={handleBoardInput} value={board} className="appearance-none bg-gray-100 text-gray-700 border block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
								<option value="" >Select Board</option>
								{BOARDS.map((board: any) => {
                                    const alreadyselected = boards.filter(b => b.data.key == board.key);

                                    if (alreadyselected.length == 0) {
                                        return (
										<option
											key={board.key}
											value={board.key}
										>{ board.value }</option>
									)
                                    }

                                })}
                            </select>
                        </div>
						<div className="grid w-32">
							<button onClick={storeBoard} className={registerBoardClasses()}>
								Register
                            </button>
                        </div>
					</div>
				</div>

				<div className="divide-y"></div>

				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 grid grid-cols-2 gap-4">

					{boards.map((board: Board) => {
                        return (
                                <section
									key={board.data.key}
									className="w-full max-w-lg border rounded overflow-hidden shadow-lg p-5"
									>

									<h6 className="text-lg font-bold dark:text-white">{board.data.value}</h6>

									<div className="flex flex-wrap -mx-3 mb-6 mt-5">
										<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
											<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
												Status
                                            </label>
											<input
												value={board.status}
												onChange={(e) => handleBoardState(e, board.data.key)}
												className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
												type="text"
                                            />
                                        </div>
										<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
											<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
												Sprint
                                            </label>
											<input
												value={board.sprint}
												onChange={(e) => handleBoardSprint(e, board.data.key)}
												className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
												type="text"
                                            	/>
                                        </div>
                                    </div>

									<div className="flex flex-wrap -mx-3 mb-6 mt-5">
										<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 grid gap-4 grid-cols-2">
											<button
												onClick={(e) => updateBoard(e, board)}
												className={updateBoardClasses()}
											>
												Save
                                            </button>
											<button
												onClick={(e) => removeBoard(e, board)}
												className={removeBoardClasses()}
											>
												Remove
                                            </button>
                                        </div>
                                    </div>

                                </section>
                        )
                    })}

                </div>

			</main>
		</section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { 'deployControlClient.authToken': token } = parseCookies(context);

    if (! token) {
        return {
            redirect: {
                destination: '/login',
				permanent: false,
			}
        };
    }

	const payload: any = openJwtToken(token);
    const boards = await findBoardByUserId(payload.id);

	return {
        props: {
            boards: JSON.parse(JSON.stringify(boards))
        }
    };
};