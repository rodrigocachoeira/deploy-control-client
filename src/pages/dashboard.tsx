import Navbar from './layout/navbar';
import { Card } from './components/card';
import { CardProps } from "./components/card";

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {useContext} from "react";
import {AuthContext} from "./contexts/AuthContext";

const issues: CardProps[] = [
  {
    number: 1,
    title: 'ANDRÔMEDA-1602',
    type: 'bug',
    tags: [
      'FRONT',
      'BACK',
      'INFRA',
    ],
    author: {
      email: 'rodrigo.cachoeira@effecti.com.br',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    approvesCount: 10,
    requestedReviews: {
      back: false,
      front: true,
      infra: true
    },
  },
  {
    number: 2,
    title: 'ANDRÔMEDA-1607',
    type: 'task',
    tags: [
      'FRONT',
      'BACK',
    ],
    author: {
      email: 'rodrigo.cachoeira@effecti.com.br',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    approvesCount: 7,
    requestedReviews: {
      back: false,
      front: true,
      infra: true
    }
  }
];

export default function Home() {
	const { user } = useContext(AuthContext);

  	return (
	    <div className="min-h-full">
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
	            <div className="flex items-center justify-center" >
	              {issues.map(issue => {
	                return (
	                    <Card
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
	    </div>
  	)
}
