import { useTheme } from '../contexts/ThemeContext'
import Search from '../components/Search'
import TaskCard from '../components/TaskCard'

const TaskPage = () => {
  const { isDark } = useTheme()

  const pageBg = isDark ? 'bg-[#1b1b1d]' : 'bg-white'
  const textColor = isDark ? 'text-zinc-100' : 'text-gray-900'

  return (
    <>
      <div className={`${pageBg} min-h-screen`}>
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
      </div>
    </>
  )
}

export default TaskPage