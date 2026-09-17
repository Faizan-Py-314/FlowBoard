import { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'
import { ProjectContext } from '../contexts/ProjectContext'
import { useTheme } from '../contexts/ThemeContext'

const AddTask = ({ feature_id }) => {
  const [subTasks, setSubTasks] = useState(['', ''])
  const [formData, setFormData] = useState({task: '', description: ''})
  const containerRef = useRef(null)
  const { isDark } = useTheme()

  const { addTask } = useContext(TaskContext)
  const { project } = useContext(ProjectContext)

  // Theme classes
  const cardBg = isDark ? 'bg-[#262628]' : 'bg-white'
  const borderColor = isDark ? 'border-zinc-700' : 'border-gray-300'
  const inputBg = isDark ? 'bg-[262628]' : 'bg-white'
  const inputBorder = isDark ? 'border-zinc-700' : 'border-gray-300'
  const inputText = isDark ? 'text-zinc-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-700'
  const btnPrimary = isDark ? 'bg-[#464648] text-zinc-200' : 'bg-black text-white'
  const btnHover = isDark ? 'hover:bg-zinc-700' : 'hover:bg-gray-800'

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
    <div className={`border ${borderColor} rounded-sm p-2 ${cardBg}`}>
      <div className='flex flex-col gap-2 text-xs md:text-sm'>
        <input required onChange={handleChange} className={`border ${inputBorder} px-2 py-1.5 md:p-2 rounded-sm focus:outline-none ${inputBg} ${inputText}`} type="text" name='task' value={formData.task} placeholder='Task' />
        <textarea onChange={handleChange} className={`border ${inputBorder} px-2 py-1.5 md:p-2 rounded-sm focus:outline-none ${inputBg} ${inputText}`} type="text" name='description' value={formData.description} placeholder='Description (Optional)'></textarea>
        <div className={`border ${borderColor} rounded-sm p-2 text-xs md:text-sm w-full flex flex-col gap-2 ${cardBg}`}>
            <span className={`text-xs ${textSecondary}`}>SubTasks (Optional)</span>
            <div ref={containerRef} className='h-17 md:h-21 overflow-auto no_scrollbar flex flex-col gap-2'>
                {subTasks.map((subTask, index) => (
                    <input onChange={(e) => handleSubTaskChange(e, index)} key={index} value={subTask} className={`w-full border ${inputBorder} px-2 py-1.5 md:p-2 rounded-sm focus:outline-none ${inputBg} ${inputText}`} type="text" placeholder={`SubTask ${index+1}`} />
                ))}
            </div>
            <button onClick={() => setSubTasks([...subTasks, ''])} className={`${btnPrimary} ${btnHover} rounded-sm py-1.5 md:p-2 cursor-pointer`}>Add SubTask</button>
        </div>
            <button onClick={handleSubmit} className={`${btnPrimary} ${btnHover} rounded-sm py-1.5 md:p-2 cursor-pointer`}>Create Task</button>
      </div>
    </div>
    </div>
  )
}

export default AddTask