import React, { useContext } from 'react'
import { ProjectContext } from '../contexts/ProjectContext'
import { useTheme } from '../contexts/ThemeContext'

const ProjectCard = ({ project, setRequirmentIsOpen, setAddProjectisOpen, setIsEditMode, setFeatureIsOpen }) => {
    const { getProject } = useContext(ProjectContext)
    const { isDark } = useTheme()

    const formatTimeAgo = (isoDateString) => {
        if (!isoDateString) return '';

        const date = new Date(isoDateString);
        const now = new Date();
        const secondsAgo = Math.floor((now - date) / 1000);

        if (secondsAgo < 5) return 'just now';

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 },
        ];

        for (const interval of intervals) {
            const count = Math.floor(secondsAgo / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    };

    // Theme-aware tag colors (slightly adjusted for dark mode)
    const getTagClasses = (tag) => {
        const tagBase = {
            tag1: ['dark:text-zinc-300 dark:bg-zinc-700', 'text-zinc-500 bg-zinc-100'],
            Future: ['dark:text-zinc-300 dark:bg-zinc-700', 'text-zinc-500 bg-zinc-100'],
            inProgress: ['dark:text-amber-400 dark:bg-amber-800/30', 'text-amber-500 bg-amber-100'],
            Completed: ['dark:text-emerald-400 dark:bg-emerald-800/30', 'text-emerald-500 bg-emerald-100'],
            Beginner: ['dark:text-sky-400 dark:bg-sky-800/30', 'text-sky-500 bg-sky-100'],
            Intermediate: ['dark:text-violet-400 dark:bg-violet-800/30', 'text-violet-500 bg-violet-100'],
            Advanced: ['dark:text-rose-400 dark:bg-rose-800/30', 'text-rose-500 bg-rose-100'],
            Python: ['dark:text-yellow-400 dark:bg-yellow-800/30', 'text-yellow-500 bg-yellow-100'],
            FastAPI: ['dark:text-teal-400 dark:bg-teal-800/30', 'text-teal-500 bg-teal-100'],
            React: ['dark:text-blue-400 dark:bg-blue-800/30', 'text-blue-500 bg-blue-100'],
        }
        return tagBase[tag] || tagBase.tag1
    }

    // Theme classes
    const cardBg = isDark ? 'bg-[#262628]' : 'bg-white'
    const cardBorder = isDark ? 'border-zinc-700' : 'border-gray-400'
    const titleColor = isDark ? 'text-zinc-100' : 'text-gray-900'
    const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-600'
    const dividerColor = isDark ? 'text-zinc-700' : 'text-gray-200'
    const linkColor = isDark ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:underline'
    const btnPrimary = isDark ? 'bg-[#464648]' : 'bg-black'
    const btnText = isDark ? 'text-zinc-200' : 'text-white'

    if (!project) return null;

    const tags = project.tags.length > 3? project.tags.slice(0, 3):project.tags

  return (
    <div className={`${cardBg} ${cardBorder} border p-4 rounded-lg w-full`}>
        <div className='flex gap-2 items-cente text-xs'>
            {tags.map((tag, index) => (
                <span key={index} className={`py-1 px-2 rounded-sm ${isDark ? getTagClasses(tag)[0] : getTagClasses(tag)[1]}`}>{tag}</span>
            ))}
        </div>

        <div className='flex flex-col gap-1 mt-2'>
            <h2 className={`text-2xl font-bold ${titleColor}`}>{project.name}</h2>
            <div className={`-mt-1 ${textSecondary}`}>
                <span className=''>Last Changes: {formatTimeAgo(project.last_change)}</span>
                <br />
                <span>10 Features, </span><span>2 Referance Images</span>

            </div>
            <hr className={dividerColor} />
            <span onClick={() => {getProject(project.id); setRequirmentIsOpen(true)}} className={`text-sm ${linkColor} w-fit cursor-pointer`}>Details and Requirements</span>
            <div className='flex gap-2 items-center mt-2'>
                <button onClick={async () => {await getProject(project.id); setFeatureIsOpen(true)}} className={`${btnPrimary} ${btnText} py-2 px-3 rounded-md text-sm cursor-pointer`}>View Tasks</button>
                <button onClick={async () => {setIsEditMode(true); await getProject(project.id); setAddProjectisOpen(true); }} className={`${btnPrimary} ${btnText} py-2 px-3 rounded-md text-sm cursor-pointer`}>Edit Details</button>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard