import { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { ProjectContext } from '../contexts/ProjectContext'

const AddTask = ({ feature_id }) => {
  const [subTasks, setSubTasks] = useState(['', ''])
  const [formData, setFormData] = useState({task: '', description: ''})
  const containerRef = useRef(null)

  const { addTask } = useContext(TaskContext)
  const { project } = useContext(ProjectContext)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [subTasks])

  const handleSubTaskChange = (e, index) => {
    const newSubTasks = [...subTasks]
    newSubTasks[index] = e.target.value
    setSubTasks(newSubTasks)
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    try {
      const updatedSubTasks = subTasks.filter(subTask => subTask.length > 0);
      if (formData.description.length == 0) {formData.description = null}
      let subTaskArray = []
      for (const subtask of updatedSubTasks) {subTaskArray.push({subTask:subtask, isComplete:false})}
      await addTask({task: formData.task, description: formData.description, subTasks:subTaskArray}, project.id, feature_id)
      setFormData({task: '', description: ''})
      setSubTasks(['', ''])
    } catch (error) {
      alert('Failed to add Task')
    }
  }

  return (
    <div className='overflow-hidden'>
    <div className='border border-gray-300 rounded-sm p-2'>
      <div className='flex flex-col gap-2 text-xs md:text-sm'>
        <input required onChange={handleChange} className='border border-gray-300 px-2 py-1.5 md:p-2 rounded-sm focus:outline-none' type="text" name='task' value={formData.task} placeholder='Task' />
        <textarea onChange={handleChange} className='border border-gray-300 px-2 py-1.5 md:p-2 rounded-sm focus:outline-none' type="text" name='description' value={formData.description} placeholder='Description (Optional)'></textarea>
        <div className='border border-gray-300 rounded-sm p-2 text-xs md:text-sm w-full flex flex-col gap-2'>
            <span className='text-xs '>SubTasks (Optional)</span>
            <div ref={containerRef} className='h-17 md:h-21 overflow-auto no_scrollbar flex flex-col gap-2'>
                {subTasks.map((subTask, index) => (
                    <input onChange={(e) => handleSubTaskChange(e, index)} key={index} value={subTask} className='w-full border border-gray-300 px-2 py-1.5 md:p-2 rounded-sm focus:outline-none' type="text" placeholder={`SubTask ${index+1}`} />
                ))}
            </div>
            <button onClick={() => setSubTasks([...subTasks, ''])} className='bg-black text-white rounded-sm py-1.5 md:p-2 cursor-pointer'>Add SubTask</button>
        </div>
            <button onClick={handleSubmit} className='bg-black text-white rounded-sm py-1.5 md:p-2 cursor-pointer'>Create Task</button>
      </div>
    </div>
    </div>
  )
}

export default AddTask