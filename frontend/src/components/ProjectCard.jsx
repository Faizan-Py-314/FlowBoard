import React, { useContext } from 'react'
import { ProjectContext } from '../contexts/ProjectContext'

const ProjectCard = ({ project, setRequirmentIsOpen, setAddProjectisOpen, setIsEditMode }) => {
    const { getProject } = useContext(ProjectContext)

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

    const tag_colors = {
        tag1: ['text-zinc-500', 'bg-zinc-100'],
        Future: ['text-zinc-500', 'bg-zinc-100'],
        inProgress: ['text-amber-500', 'bg-amber-100'],
        Completed: ['text-emerald-500', 'bg-emerald-100'],
        Beginner: ['text-sky-500', 'bg-sky-100'],
        Intermediate: ['text-violet-500', 'bg-violet-100'],
        Advanced: ['text-rose-500', 'bg-rose-100'],
        Python: ['text-yellow-500', 'bg-yellow-100'],
        FastAPI: ['text-teal-500', 'bg-teal-100'],
        React: ['text-blue-500', 'bg-blue-100'],
    }

    if (!project) return null;

    const tags = project.tags.length > 3? project.tags.slice(0, 3):project.tags
    
  return (
    <div className='border border-gray-400 p-4 rounded-lg w-full'>
        <div className='flex gap-2 items-cente text-xs'>
            {tags.map((tag, index) => (
                <span key={index} className={`py-1 px-2 rounded-sm ${tag_colors[`${tag}`][0]} ${tag_colors[`${tag}`][1]}`}>{tag}</span>
            ))}
        </div>

        <div className='flex flex-col gap-1 mt-2'>
            <h2 className='text-2xl font-bold'>{project.name}</h2>
            <div className='-mt-1 text-gray-600'>
                <span className=''>Last Changes: {formatTimeAgo(project.last_change)}</span>
                <br />
                <span>10 Features, </span><span>2 Referance Images</span>
                
            </div>
            <hr className='text-gray-200' />
            <span onClick={() => {getProject(project.id); setRequirmentIsOpen(true)}} className='text-sm text-gray-600 cursor-pointer hover:underline w-fit'>Details and Requirements</span>
            <div className='flex gap-2 items-center mt-2'>
                <button className='py-2 px-3 bg-black text-white rounded-md text-sm cursor-pointer'>View Tasks</button>
                <button onClick={async () => {setIsEditMode(true); await getProject(project.id); setAddProjectisOpen(true); }} className='py-2 px-3 bg-black text-white rounded-md text-sm cursor-pointer'>Edit Details</button>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard