import Head from 'next/head';
import Header from '../components/Header';
import TasksList from '../components/TasksList';

export default function Home() {
  return (
    <div>
      <Head>
        <title>myTodo App</title>
        <meta name="description" content="Todo app made by sconder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Tasks List */}
      <TasksList />
    </div>
  )
}