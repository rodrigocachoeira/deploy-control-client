import { Card } from './components/card';
import { Heading } from './components/heading';
import Navbar from './layout/navbar';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { GetServerSideProps } from "next";

import { groupBy, keys } from "lodash";
import { parseCookies } from 'nookies';
import { useEffect, useState } from "react";
import { Issue } from "../../types/issue";
import { openJwtToken } from "../lib/jwt";
import { getBordsOfUser } from "../models/board";
import { getIssuesOfBoard } from '../services/jira/issues';

export default function Dashboard({... data }) {
	const [board, setBoard] = useState<string>("");
    const [issues, setIssues] = useState<Issue[]>([]);

    const availableBoards = data.availableBoards;

    useEffect(() => {
			const filteredIssues = data.issues.filter((issue: any) => {
				return issue.board === board;
			});
			
			setIssues(filteredIssues);
    }, [board]);

    function handleBoardEvent(event: any) {
        setBoard(event.target.value);
    }

  	return (
	    <section className="h-screen bg-white">
	      <Navbar />

				<header className="bg-white mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

				<Heading title="Sprint 22" />

			  <div className="grid grid-cols-2 py-6 px-4 sm:px-6 lg:px- gap-2" >
				<div>
					  <select
						  onChange={handleBoardEvent}
						  className="appearance-none bg-gray-100 text-gray-700 border block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
					  >
							  <option value="" >Select Board</option>
							  {availableBoards.map((board: string) => {
                                  return (
                                          <option
											  key={board}
											  value={board}
											  >{ board }
                                          </option>
                                          )

                              })}
                      </select>
                  </div>

				  <div>
					  <button className="bg-purple-700 cursor-pointer hover:bg-purple-500 text-green-100 font-bold py-2 px-4 rounded inline-flex items-center">
						  <ArrowPathIcon className="block h-6 w-6" aria-hidden="true" />&nbsp;
						  <span>Sync Board</span>
                      </button>
                  </div>

              </div>


	      </header>

		  <div className="divide-y" ></div>

	      <main>

	        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
	          <div className="px-4 py-6 sm:px-0">
	            <div className="grid grid-cols-4 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2" >
				{issues.map((issue: any, index: number) => {
	                return (
	                    <Card
						 key={index}
	                      number={issue.number}
	                      type={issue.type}
	                      title={issue.title}
	                      tags={issue.tags}
	                      author={issue.author}
	                      approvesCount={issue.approvesCount}
	                      requestedReviews={issue.requestedReviews}
	                    />
	                )
	              })}
	            </div>
	          </div>
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

	let issues: any = [];
	const payload: any = openJwtToken(token);
	const boards = await getBordsOfUser(payload.id);

	for (let i = 0; i < boards.length; i++) {
			const boardIssues = await getIssuesOfBoard(context, {
				board: boards[i].internal,
				sprint: 740,
				status: boards[i].status,
			});

			issues.push(... boardIssues);
	}

	const availableBoards: any = groupBy(issues, 'board');

	return {
		props: {
			issues: issues,
			availableBoards: keys(availableBoards),
		}
	}
};
