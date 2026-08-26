import React, { useState, useEffect, useRef, useId } from "react";
import { RiArrowDropDownLine } from "@remixicon/react";


const Dropdown = ({ className = '', title = "Select Option", items = [], postion = 'right-0' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={`${className} cursor-pointer inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-none`} aria-expanded={isOpen}> {title} <RiArrowDropDownLine className={`-mr-1 h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} /> </button>

      
        <div className={`${isOpen? 'absolute':'hidden'} ${postion} z-10 mt-2 min-w-40 origin-top-right rounded-md bg-white border border-gray-300 transition-transform`}>
            <div className="py-1" role="none">
            {items.map((item, index) => {
              const inputId = `${instanceId}-checkbox-${index}`
              return(
                <label key={index} htmlFor={inputId} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer">
                    <input onChange={() => handleCheckboxChange(index)} checked={checkedItems[index] || false} className="accent-black" id={inputId} type="checkbox"></input>
                    <span htmlFor={item.label} className="block w-full text-left text-sm text-gray-500 " role="menuitem">{item.label}</span>
                </label>
            )})}
            </div>
        </div>
    </div>
  );
}

export default Dropdown