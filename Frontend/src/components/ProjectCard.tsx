/**
 * DO NOT EDIT
 */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaFlag } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';

const ProjectCard = ({ initialTitle = "Workspace Name", initialSubtitle = "Workspace Type" }) => {
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const subtitleRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (editingTitle && titleRef.current) {
      titleRef.current.focus();
    }
    if (editingSubtitle && subtitleRef.current) {
      subtitleRef.current.focus();
    }
  }, [editingTitle, editingSubtitle]);


  const handleDoubleClick = (field: 'title' | 'subtitle') => {
    if (field === 'title') {
      setEditingTitle(true);
    } else {
      setEditingSubtitle(true);
    }
  };


  const handleBlur = (field: 'title' | 'subtitle') => {
    if (field === 'title') {
      setEditingTitle(false);
    } else {
      setEditingSubtitle(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'title' | 'subtitle') => {
    if (e.key === 'Enter') {
      handleBlur(field);
    }
  };


  const handleCardClick = () => {
    navigate("/component-selector");
  };


  return (
    <div
      className="w-96 h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-3/4 bg-gradient-to-b from-gray-300 to-gray-500"></div>
      <div className="h-1/4 bg-white p-3 flex justify-between items-center">
        <div>
          {/* Title Section */}
          {editingTitle ? (
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => handleBlur('title')}
              onKeyDown={(e) => handleKeyDown(e, 'title')}
              className="font-bold text-lg outline-none"
              placeholder="Workspace Name"
            />
          ) : (
            <h3
              className="font-bold text-lg cursor-pointer"
              onDoubleClick={() => handleDoubleClick('title')}
            >
              {title || "Workspace Name"}
            </h3>
          )}
         
          {/* Subtitle Section */}
          {editingSubtitle ? (
            <input
              ref={subtitleRef}
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              onBlur={() => handleBlur('subtitle')}
              onKeyDown={(e) => handleKeyDown(e, 'subtitle')}
              className="text-sm text-gray-600 outline-none"
              placeholder="Workspace Type"
            />
          ) : (
            <p
              className="text-sm text-gray-600 cursor-pointer"
              onDoubleClick={() => handleDoubleClick('subtitle')}
            >
              {subtitle || "Workspace Type"}
            </p>
          )}
        </div>
       
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-gray-800">
            <FaBell />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <FaFlag />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <HiDotsVertical />
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProjectCard;
