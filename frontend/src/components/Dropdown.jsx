import React, { useState, useEffect, useRef, useId } from "react";
import { useTheme } from '../contexts/ThemeContext'
import { RiArrowDropDownLine } from "@remixicon/react";


const Dropdown = ({ className = '', title = "Select Option", items = [], postion = 'right-0' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));
  const dropdownRef = useRef(null);
  const { isDark } = useTheme()

  const instanceId = useId();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleCheckboxChange = (index) => {
    const nextState = !checkedItems[index];

    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index] = nextState;
      return updated;
    });

    if (items[index]?.action) {
      items[index].action(items[index], nextState);
    }

  };

  // Theme classes
  const btnBg = isDark ? 'bg-[#2d2d2f]' : 'bg-white'
  const btnText = isDark ? 'text-zinc-300' : 'text-gray-900'
  const btnBorder = isDark ? 'border-zinc-700' : 'border-gray-300'
  const btnHover = isDark ? 'hover:bg-zinc-700' : 'hover:bg-gray-50'
  const dropdownBg = isDark ? 'bg-zinc-700' : 'bg-white'
  const dropdownBorder = isDark ? 'border-zinc-600' : 'border-gray-300'
  const itemHover = isDark ? 'hover:bg-zinc-600' : 'hover:bg-gray-100'
  const itemText = isDark ? 'text-zinc-400' : 'text-gray-500'
  const iconColor = isDark ? 'text-zinc-500' : 'text-gray-400'

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={`${className} cursor-pointer inline-flex w-full justify-center items-center gap-x-1.5 rounded-md ${btnBg} px-4 py-2 text-sm ${btnText} border ${btnBorder} ${btnHover} focus:outline-none`} aria-expanded={isOpen}>
        {title}
        <RiArrowDropDownLine className={`-mr-1 h-5 w-5 ${iconColor} transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>


        <div className={`${isOpen? 'absolute':'hidden'} ${postion} z-10 mt-2 min-w-40 origin-top-right rounded-md ${dropdownBg} border ${dropdownBorder} transition-transform`}>
            <div className="py-1" role="none">
            {items.map((item, index) => {
              const inputId = `${instanceId}-checkbox-${index}`
              return(
                <label key={index} htmlFor={inputId} className={`flex items-center gap-2 px-4 py-2 ${itemHover} transition-colors cursor-pointer`}>
                    <input onChange={() => handleCheckboxChange(index)} checked={checkedItems[index] || false} className={isDark ? "accent-zinc-400" : "accent-black"} id={inputId} type="checkbox"></input>
                    <span htmlFor={item.label} className={`block w-full text-left text-sm ${itemText}`} role="menuitem">{item.label}</span>
                </label>
            )})}
            </div>
        </div>
    </div>
  );
}

export default Dropdown