import Navbar from './layout/navbar';
import { Card } from './components/card';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { GetServerSideProps } from "next";

import { parseCookies } from 'nookies';
import { getIssuesOfBoard } from '../services/jira/issues';

export default function Dashboard({... data }) {
    const issues = data.issues;

  	return (
	    <section className="min-h-full">
	      <Navbar />
	      <header className="bg-white shadow">
	        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
	          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
	            Sprint 22
	          </h1>
	        </div>
	       <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8" >
	         <button className="bg-purple-700 cursor-pointer hover:bg-purple-500 text-green-100 font-bold py-2 px-4 rounded inline-flex items-center">
	          <ArrowPathIcon className="block h-6 w-6" aria-hidden="true" />&nbsp;
	          <span>Sync</span>
	        </button>
	      </div>
	      </header>
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

	const issues = await getIssuesOfBoard(context, {
        board: 'MARTE',
		sprint: 740,
		status: "Doing",
    });

	return {
        props: {
            issues: issues
        }
    }
};
