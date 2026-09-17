import { useContext, useMemo, useState, useEffect } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { ProjectContext } from '../contexts/ProjectContext'
import { useTheme } from '../contexts/ThemeContext'
import { RiSettings3Line, RiListCheck2, RiListCheck3, RiFileTextLine, RiAddCircleFill, RiIndeterminateCircleFill } from '@remixicon/react'
import CircularProgressBar from './CircularProgressBar'
import TaskItem from './TaskItem'
import AddTask from './AddTask'
import FeatureSettings from './FeatureSettings'

const FeatureCard = ({feature}) => {
    const [isTasksOpen, setIsTasksOpen] = useState(false)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const { tasks, getTasks } = useContext(TaskContext)
    const { project } = useContext(ProjectContext)
    const { isDark } = useTheme()

     useEffect(() => {
        getTasks(project.id, feature.id)
    }, [getTasks])

    const featureTasks = useMemo(
        () => tasks.filter(t => t.feature_id === feature.id),
        [tasks, feature.id]
    )

    const completedTasks = featureTasks.filter(task => task.isComplete).length

    if (!tasks) {
        return <div className='modal'>Loading...</div>
    }

    // Theme classes
    const cardBg = isDark ? 'bg-[#262628]' : 'bg-white'
    const borderColor = isDark ? 'border-zinc-700' : 'border-gray-300'
    const textPrimary = isDark ? 'text-zinc-100' : 'text-gray-900'
    const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-600'
    const dividerColor = isDark ? 'text-zinc-700' : 'text-gray-300'
    const iconColor = isDark ? 'text-zinc-400' : 'text-gray-600'
    const btnBg = isDark ? 'bg-zinc-700' : 'bg-white'
    const btnBorder = isDark ? 'border-zinc-600' : 'border-gray-300'

    return (
        <div>
            {isSettingsOpen && <FeatureSettings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} tasks={featureTasks} project_id={project.id} feature={feature} />}
            <div className={`border ${borderColor} ${cardBg} p-2 rounded-md md:p-2.5`}>
                <div className='flex items-center justify-between'>
                    <span className={`font-bold ${textPrimary}`}>{feature.name}</span>
                    <div className={`flex items-center ${featureTasks.length <= 0? 'gap-1.5':'gap-2'} mr-1 -md:mt-1`}>
                        <RiFileTextLine onClick={() => {setIsDescriptionOpen(!isDescriptionOpen); setIsTasksOpen(false)}} className={`cursor-pointer w-3 h-3 md:w-4 md:h-4 ${iconColor}`} />
                        {featureTasks.length >0 ? <RiListCheck3 onClick={() => { setIsTasksOpen(!isTasksOpen); setIsDescriptionOpen(false) }} className={`cursor-pointer w-3 h-3 md:w-4 md:h-4 ${iconColor}`} />:
                        <RiAddCircleFill onClick={() => {setIsAddTaskOpen(true); setIsTasksOpen(!isTasksOpen)}} className={`w-4 h-4 cursor-pointer md:w-5 md:h-5 ${iconColor}`} />}
                    </div>
                </div>
                <span className={`text-xs md:text-sm ${textSecondary}`}>Total Task: {featureTasks.length}, Completed: {completedTasks}</span>
                <div className='mt-1 flex items-end justify-between'>
                    <div className=' flex gap-2'>
                        <span onClick={() => setIsSettingsOpen(true)} className={`flex items-center text-xs md:text-sm gap-1 border py-1 px-2 ${btnBorder} rounded-sm w-fit cursor-pointer ${textSecondary} ${btnBg}`}><RiSettings3Line className='w-3 h-3 -ml-1 md:w-4 md:h-4' /> Settings</span>
                        <span onClick={() => { featureTasks.length > 0? setIsTasksOpen(!isTasksOpen):setIsTasksOpen(false) ; setIsDescriptionOpen(false) }} className={`py-1 px-2 rounded-sm border ${btnBorder} cursor-pointer ${iconColor} ${btnBg}`}><RiListCheck2 className='w-4 h-4 md:w-5 md:h-5' /></span>
                    </div>
                    <div className='mr-1'>
                        <CircularProgressBar TotalTasks={featureTasks.length} testCompleted={completedTasks} strockColor={completedTasks == featureTasks.length?'stroke-green-500':`stroke-yellow-500`} size={20} strokeWidth={3} />
                    </div>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${isTasksOpen ? 'grid-rows-[1fr] opacity-100 mt-2 md:mt-3' : 'grid-rows-[0fr] opacity-0 my-0 -mb-1'
                    }`}>
                    <div className='overflow-hidden'>
                        <hr className={`${dividerColor} mb-2 mx-2`} />
                        <div className={`${featureTasks.length <= 0? 'hidden':'flex'} justify-between mx-2 md:mb-1`}>
                            <h3 className={`font-bold ${textPrimary}`}>Tasks</h3>
                            {!isAddTaskOpen ?<RiAddCircleFill onClick={() => setIsAddTaskOpen(true)} className={`w-4 h-4 cursor-pointer md:w-5 md:h-5 ${iconColor}`} />
                            :<RiIndeterminateCircleFill onClick={() => setIsAddTaskOpen(false)} className={`w-4 h-4 cursor-pointer md:w-5 md:h-5 ${iconColor}`} />}
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isAddTaskOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <AddTask feature_id={feature.id} />
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isAddTaskOpen ? 'grid-rows-[0fr] opacity-0':'grid-rows-[1fr] opacity-100'}`}>
                            <div className='overflow-hidden flex flex-col gap-2'>
                                {featureTasks.map(task => (
                                    <TaskItem key={task.id} task={task} feature_id={feature.id} project_id={project.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`border ${borderColor} rounded-sm text-xs md:text-sm grid transition-all duration-300 ease-in-out ${isDescriptionOpen ? 'grid-rows-[1fr] opacity-100 mt-2 p-2 md:mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                    <div className='overflow-hidden'>
                        <p className={textSecondary}>{feature.description}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FeatureCard