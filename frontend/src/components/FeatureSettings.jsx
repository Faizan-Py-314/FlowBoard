import { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { FeatureContext } from '../contexts/FeatureContext'
import { RiDeleteBin7Line, RiEditLine, RiSendInsLine } from '@remixicon/react'

const FeatureSettings = ({ isOpen = true, setIsOpen, tasks, project_id, feature }) => {
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(false)
    const [taskInEdit, setTaskInEdit] = useState(null)
    const [subTaskInEdit, setSubTaskInEdit] = useState(null)
    const [isSubTasksOpen, setIsSubTasksOpen] = useState(null)
    const [featureInEdit, setFeatureInEdit] = useState(false)
    const [taskData, setTaskData] = useState({task:'', description:''})
    const [subTaskData, setSubTaskData] = useState({subTask:''})
    const [featureData, setFeatureData] = useState({name: '', description: ''})

    const { editTask, removeTask } = useContext(TaskContext)
    const { editFeature, removeFeature } = useContext(FeatureContext)

    const taskInputRef = useRef(null)
    const subTaskInputRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            const timer = setTimeout(() => setIsVisible(true), 10)
            return () => clearTimeout(timer)
        } else {
            setIsVisible(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (taskInEdit && taskInputRef.current) {
            taskInputRef.current.focus()
            const length = taskInputRef.current.value.length
            taskInputRef.current.setSelectionRange(length, length)
        }
    }, [taskInEdit])

    useEffect(() => {
        if (subTaskInEdit && subTaskInputRef.current) {
            subTaskInputRef.current.focus()
            const length = subTaskInputRef.current.value.length
            subTaskInputRef.current.setSelectionRange(length, length)
        }
    }, [subTaskInEdit])

    const handleClose = () => {
        setIsVisible(false)
        const timer2 = setTimeout(() => setIsOpen(false), 30)
        return () => clearTimeout(timer2)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }

    const handleTransitionEnd = () => {
        if (!isVisible) setIsMounted(false)
    }

    const handleTaskChange = (e) => {
        setTaskData({...taskData, [e.target.name]: e.target.value})
    }

    const handleSubTaskChange = (e) => {
        setSubTaskData({...subTaskData, [e.target.name]: e.target.value})
    }

    const handleTaskUpdate = (index) => {
        try {
            const taskCopy = tasks.map(task => ({...task}))
            taskCopy[index].task = taskData.task
            taskCopy[index].description = taskData.description
            const task = taskCopy[index]
            editTask(task, project_id, feature.id, task.id)
        } catch (error) {alert('Failed to update task. Please try later')}
    }

    const handleSubTaskUpdate = (task_index, index) => {
        try {
            const taskCopy = tasks.map(task => ({...task}))
            const task = taskCopy[task_index]
            task.subTasks[index] = {subTask: subTaskData.subTask, isComplete: false}
            editTask(task, project_id, feature.id, task.id)
        } catch (error) {alert('Failed to update subTask. Please try later')}
    }

    const handleFeatureChange = (e) => {
        setFeatureData({...featureData, [e.target.name]: e.target.value})
    }

    const handleFeatureUpdate = () => {
        try {
            const featureCopy = feature
            featureCopy.name = featureData.name
            featureCopy.description = featureData.description
            editFeature(featureCopy, project_id, feature.id)
        } catch (error) {alert('Failed to Update Feature. Please try again later')}
    }

    const handleTaskDelete = (task_id) => {
        const conformDeleteRequest = window.confirm('Are you you want to delete this task')
        if (conformDeleteRequest) removeTask(project_id, feature.id, task_id)
    }

    if (!isMounted) return null;

    return (
        <div onClick={handleBackdropClick} className={`fixed inset-0 h-full flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div onTransitionEnd={handleTransitionEnd} className={`mx-auto relative bg-white p-2 rounded-md flex flex-col gap-2 text-sm w-75 border md:text-base md:w-100 md:p-3 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} >
                <div className='flex items-center justify-between mx-1 md:mx-2'>
                    <h2 className='text-xl font-bold'>Settings</h2>
                    <button onClick={() => {setFeatureInEdit(!featureInEdit); setFeatureData({name: `${feature.name}`,description: `${feature.description}`})}} className='text-xs md:text-sm text-center flex py-1 md:py-1.5 px-2 rounded-sm bg-blue-400 text-white cursor-pointer'>Edit Feature</button>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${featureInEdit ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 -my-3.5 md:-my-4'}`}>
                    <div className={`overflow-hidden flex flex-col gap-2 border border-gray-300 p-2 rounded-sm`}>
                        <input onChange={handleFeatureChange} className='w-full py-1 px-2 border border-gray-300 rounded-sm text-xs md:text-sm focus:outline-none' type="text" value={featureData.name} name='name' placeholder='Feature Name'/>
                        <textarea onChange={handleFeatureChange} className='w-full py-1 px-2 border border-gray-300 rounded-sm text-xs md:text-sm focus:outline-none' type="text" value={featureData.description} rows={3} name='description' placeholder='Feature Name'></textarea>
                        <button onClick={() => {handleFeatureUpdate(); setFeatureInEdit(false)}} className='w-full bg-blue-400 p-1 rounded-sm text-white text-xs md:text-sm cursor-pointer'>Update Feature</button>
                    </div>
                </div>

                <div className='flex flex-col gap-2 max-h-60 mb-13 overflow-auto no_scrollbar'>
                    {tasks.map((task, task_index) => (
                        <div key={task.id} className='border border-gray-300 rounded-sm py-1 px-2 text-xs md:text-sm md:gap-2'>
                            <div className='flex items-center justify-between'>
                                <span onClick={() => { setIsSubTasksOpen(isSubTasksOpen == `task_${task.id}` || task.subTasks.length <= 0 ? null : `task_${task.id}`) }} className={`${taskInEdit == `task_${task.id}` ? 'hidden' : 'block'} ${task.subTasks.length <= 0? '':'cursor-pointer'} w-full`}>{task.task}</span>
                                <input onChange={handleTaskChange} ref={taskInEdit == `task_${task.id}` ? taskInputRef : null} className={`${taskInEdit == `task_${task.id}` ? 'block' : 'hidden'} focus:outline-none w-full`} name='task' type="text" value={taskData.task} />
                                <div className='flex gap-1.5 md:gap-2 items-center'>
                                    <button onClick={() => handleTaskDelete(task.id)} className='p-1 cursor-pointer text-xs rounded-sm bg-red-400 flex items-center justify-center'><RiDeleteBin7Line className='w-2 h-2 text-white md:w-2 md:h-2.5' /></button>
                                    <button onClick={() => { setTaskInEdit(taskInEdit == `task_${task.id}` ? null : `task_${task.id}`); setTaskData({task:`${task.task}`, description:`${task.description}`}); setIsSubTasksOpen(null) }} className='p-1 cursor-pointer text-xs rounded-sm bg-blue-400 flex items-center justify-center'><RiEditLine className='w-2 h-2 text-white md:w-2 md:h-2.5' /></button>
                                    <RiSendInsLine onClick={() => {handleTaskUpdate(task_index); setTaskInEdit(null)}} className={`${taskInEdit == `task_${task.id}` ? 'block' : 'hidden'} cursor-pointer w-3 h-3 md:w-4 md:h-4`} />
                                </div>
                            </div>

                            <div className={`grid transition-all duration-300 ease-in-out ${taskInEdit == `task_${task.id}` ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 my-0 -mb-2'}`}>
                                <div className={`overflow-hidden mt-2`}>
                                    <textarea onChange={handleTaskChange} className='w-full border rounded-sm border-gray-300 p-1.5 focus:outline-none' rows={3} value={taskData.description} name="description" ></textarea>
                                </div>
                            </div>

                            <div className={`grid transition-all duration-300 ease-in-out ${isSubTasksOpen == `task_${task.id}` ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 my-0 -mb-2'}`}>
                                <div className={`overflow-hidden subTasks my-1 flex flex-col gap-2`}>
                                    <hr className='mt-1 text-gray-300' />
                                    {task.subTasks.map((st, index) => (
                                        <div key={index} className='flex items-center justify-between border border-gray-300 rounded-sm py-1 px-2 text-xs md:text-sm md:gap-2'>
                                            <span className={`${subTaskInEdit == `subTask_${index}` ? 'hidden' : 'block'}`}>{st.subTask}</span>
                                            <input onChange={handleSubTaskChange} ref={subTaskInEdit == `subTask_${index}` ? subTaskInputRef : null} className={`${subTaskInEdit == `subTask_${index}` ? 'block' : 'hidden'} focus:outline-none w-full`} name='subTask' type="text" value={subTaskData.subTask} />
                                            <div className='flex gap-1.5 md:gap-2 items-center'>
                                                <button className='p-1 cursor-pointer text-xs rounded-sm bg-red-400 flex items-center justify-center'><RiDeleteBin7Line className='w-2 h-2 text-white md:w-2 md:h-2.5' /></button>
                                                <button onClick={() => { setSubTaskInEdit(subTaskInEdit == `subTask_${index}` ? null : `subTask_${index}`); setSubTaskData({subTask:`${st.subTask}`}) }} className='p-1 cursor-pointer text-xs rounded-sm bg-blue-400 flex items-center justify-center'><RiEditLine className='w-2 h-2 text-white md:w-2 md:h-2.5' /></button>
                                                <RiSendInsLine onClick={() => {handleSubTaskUpdate(task_index, index); setSubTaskInEdit(null)}} className={`${subTaskInEdit == `subTask_${index}` ? 'block' : 'hidden'} cursor-pointer w-3 h-3 md:w-4 md:h-4`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    ))}
                </div>
                <div className='absolute left-0 bottom-0 p-3 w-full flex justify-center'>
                    <button className='p-2 w-full cursor-pointer rounded-sm text-white bg-red-400'>Delete Feature</button>
                </div>
            </div>
        </div>
    )
}

export default FeatureSettings