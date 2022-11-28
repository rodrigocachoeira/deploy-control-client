import styles from '../../styles/Home.module.css'

import Navbar from './layout/navbar';
import { Card } from './components/card';

export default function Home() {
  return (
    <div className="min-h-full">
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sprint 22</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center justify-center" >
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
