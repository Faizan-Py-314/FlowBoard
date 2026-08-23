import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "@remixicon/react";


const Dropdown = ({ title = "Select Option", items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));
  const dropdownRef = useRef(null);

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

    // 1. Update component state
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
      <button onClick={() => setIsOpen(!isOpen)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-none" aria-expanded={isOpen}> {title} <RiArrowDropDownLine className={`-mr-1 h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} /> </button>

      
        <div className={`${isOpen? 'absolute':'hidden'} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white border`}>
            <div className="py-1" role="none">
            {items.map((item, index) => (
                <label onClick={() => {setIsOpen(false); }} key={index} htmlFor={`checkbox-${index}`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <input onChange={() => handleCheckboxChange(index)} checked={checkedItems[index || false]} className="accent-black" id={`checkbox-${index}`} type="checkbox"></input>
                    <span htmlFor={item.label} className="block w-full text-left text-sm text-gray-700 " role="menuitem">{item.label}</span>
                </label>
            ))}
            </div>
        </div>
    </div>
  );
}

export default Dropdown