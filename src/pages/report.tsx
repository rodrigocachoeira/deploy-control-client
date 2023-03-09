import { useState } from 'react';
import { Issue } from '../../types/issue';
import { get, post } from '../services/http/fetch';
import { generateMarkdown } from '../services/markdown/generate';
import { Heading } from './components/heading';
import { Loading } from './components/loading';

import Navbar from './layout/navbar';

export default function Report({... data }) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputTask, setInputTask] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');

  async function syncIssues() {
    setLoading(true);
    
    const req = await post(undefined, '/api/issues/deployed/ANDROMEDA', {
      boardId: 157
    });
    const json = await req.json();

    setLoading(false);
    setIssues(json.data.issues);
  }

  function alreadyExist(title: string) {
    return issues.filter((issue: Issue) => {
      return issue.title === title;
    }).length > 0;
  }

  async function loadIssue(title: string) {
    if (alreadyExist(title)) {
      alert('Task já sincronizada!');
      return;
    }

    setLoading(true);

    const req = await get(undefined, `/api/issues/${title}`);
    const json = await req.json();

    setLoading(false);
    setIssues([... issues, json.data.issue]);
  }

  function removeIssue(number: number) {
    const newIssues = issues.filter((issue: Issue) => {
      return issue.number !== number;
    });

    setIssues(newIssues);
  }

  function mountMarkdown() {
    const markdown = generateMarkdown('Andrômeda', issues);

    navigator.clipboard.writeText(markdown);

    setMarkdown(markdown);
  }

  function applyDisabledBehaviour(classes: string) {
    const disabled = ' opacity-50 cursor-not-allowed';
    
    if (loading) {
      return classes + disabled;
    }

    return classes;
  }

  return (
    <section className="h-screen bg-white">
	      <Navbar />

        <Heading title="Andrômeda" />

				<header className="bg-white mx-auto max-w-7xl sm:px-6 lg:px-8"></header>

        <main>

				  <section className="mx-auto max-w-7xl sm:px-6 lg:px-8">

            <div className="grid grid-cols-6 gap-4 mt-5" >
						  <div className="grid">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deploys nas últimas horas
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline" 
                  type="number" 
                  placeholder="Hours"
                  value="3"
                  readOnly
                ></input>
              </div>
              <div className="grid w-32 h-12">
                <button
                  disabled={loading}
                  onClick={() => syncIssues()}
                  className={applyDisabledBehaviour('bg-blue-500 mt-7 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex')}
                >
                  {
                    loading ? (<Loading/>) : <></> 
                  }
                  <span className='w-full' >Sync</span>
                </button>
              </div>
              <div className="grid">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Task
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline" 
                  type="text" 
                  placeholder="Task Name"
                  value={inputTask}
                  onChange={e => setInputTask(e.target.value)}
                ></input>
              </div>
              <div className="grid w-32 h-12">
                <button 
                  disabled={loading}
                  onClick={async () => await loadIssue(inputTask)} 
                  className={applyDisabledBehaviour('bg-blue-500 mt-7 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex')}
                >
                  {
                    loading ? (<Loading/>) : <></> 
                  }
                  <span className='w-full' >Add</span>
                </button>
              </div>
            </div>

          </section>

          <section className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-gray-600 mt-12 px-4">
            <div className="flex flex-col h-full">
              <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Tasks</h2>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Task</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Title</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Actions</div>
                            </th>
                        </tr>
                      </thead>

                      <tbody className="text-sm divide-y divide-gray-100">

                        {issues.map((issue: Issue) => {
                          return (
                            <tr key={issue.number} >
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="font-medium text-gray-800">{ issue.title }</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="font-medium text-gray-800">{ issue.summary }</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-left">
                                  <button
                                    onClick={() => removeIssue(issue.number ?? 0)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                  X
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <button
                onClick={mountMarkdown}
                className="bg-purple-500 mt-7 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Generate Text
              </button>
            </div>
          </section>

          <section className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 gap-4 mt-5" >
              <div className="grid">
                <p className="block text-gray-700 text-sm font-bold mb-2" >
                { markdown }
                </p>
              </div>
            </div>

          </section>

        </main>

        
    </section>
  )
}