import { useState, useEffect } from 'react'
import FeatureCard from './FeatureCard'

const Features = ({ isOpen = true, setIsOpen }) => {
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(false)
    const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false)
    const [newFeatureData, setNewFeatureData] = useState({feature: '', description: ''})

    useEffect(() => {
        if (isOpen) {
        setIsMounted(true)
        const timer = setTimeout(() => setIsVisible(true), 10)
        return () => clearTimeout(timer)
        } else {
        setIsVisible(false)
        }
    }, [isOpen])
    
    const handleClose = () => {
        setIsVisible(false)
        const timer2 = setTimeout(() => {setIsOpen(false)}, 30)
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

    const handleChange = (e) => {
        setNewFeatureData({...newFeatureData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newFeatureData.feature, newFeatureData.description);
    }

    if (!isMounted) return null;


    return (
        <div onClick={handleBackdropClick} className={`fixed inset-0 h-svh flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div onTransitionEnd={handleTransitionEnd} className={`mx-auto bg-white p-4 rounded-md flex flex-col gap-2 text-sm w-82 border md:text-base md:w-120 md:p-4 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
                <div className='flex items-end justify-between'>
                    <h2 className='text-2xl font-bold'>Features</h2>
                    <button onClick={() => setIsAddFeatureOpen(!isAddFeatureOpen)} className='py-2 px-3 text-xs cursor-pointer rounded-md bg-black text-white md:text-sm'>Add Feature</button>
                </div>
                <hr className='text-gray-300' />
                <div className='flex flex-col gap-2 md:gap-3 h-121 md:h-145 overflow-auto no_scrollbar'>
                    <div className={`grid transition-all duration-300 ease-in-out ${isAddFeatureOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 -mt-1.5 md:-mt-3'}`} >
                        <div className='overflow-hidden'>
                            <div className='border border-gray-300 rounded-md p-2 text-xs md:text-sm flex flex-col gap-2'>
                                <input onChange={handleChange} value={newFeatureData.feature} className='border border-gray-300 rounded-sm py-1 px-2 w-full focus:outline-none' type="text" name='feature' placeholder='Feature' />
                                <textarea onChange={handleChange} value={newFeatureData.description} rows={3} className='border border-gray-300 rounded-sm py-1 px-2 w-full focus:outline-none' type="text" name='description' placeholder='Description' ></textarea>
                                <button onClick={() => {setIsAddFeatureOpen(false); handleSubmit()}} className='bg-black text-white py-2 rounded-sm cursor-pointer'>Create Feature</button>
                            </div>
                        </div>
                    </div>
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                </div>
            </div>
        </div>
    )
}

export default Features