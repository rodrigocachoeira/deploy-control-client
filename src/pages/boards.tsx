import Navbar from './layout/navbar';

import { Heading } from './components/heading';
import { useState } from "react";
import { Board } from "../../types/board";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

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

export default function Boards() {
    const [board, setBoard] = useState("");
    const [boards, setBoards] = useState<Board[]>([]);

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

	function updateBoard(e: any, board: Board) {
        console.log(board);
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
										<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
											<button
												onClick={(e) => updateBoard(e, board)}
												className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											>
												Update
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

	return {
        props: {}
    };
};