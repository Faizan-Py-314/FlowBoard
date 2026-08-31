import React from 'react'
import Search from '../components/Search'
import TaskCard from '../components/TaskCard';

const TaskPage = () => {
  return (
    <>
    <div className='px-6'>
      <Search />
    </div>
      <div className='p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-8xl mx-auto'>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
      </div>
    </>
  )
}

export default TaskPage