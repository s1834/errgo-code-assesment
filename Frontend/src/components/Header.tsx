/**
 * DO NOT EDIT
 */
import { FaArrowLeft, FaArrowRight, FaPlus, FaBell, FaQuestionCircle } from 'react-icons/fa'; // Importing icons from react-icons

const Header = () => {
  return (
    <div className="bg-primary text-white flex items-center p-4 h-12 mb-7">
      {/* Left side buttons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-primary">
          <FaArrowLeft className="text-xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-primary">
          <FaArrowRight className="text-xl" />
        </button>


        {/* Square button with white plus */}
        <button className="w-8 h-8 flex items-center justify-center bg-purple-600 text-primary rounded-full hover:bg-purple-500 text-white" >
          <FaPlus className="text-xl" />
        </button>
       
        {/* Dropdown Button */}
        <button className="bg-purple-600 text-primary px-2 py-1 rounded-md hover:bg-purple-500 text-white">
          Project Name
        </button>
       
        {/* Invite Button */}
        <button className="bg-purple-600 text-primary px-2 py-1 rounded-md hover:bg-purple-500 text-white">
          Invite
        </button>
       
        {/* Deploy Button */}
        <button className="bg-purple-600 text-primary px-2 py-1 rounded-md hover:bg-purple-500 text-white">
          Deploy
        </button>
      </div>
     
      {/* Large space in the middle */}
      <div className="flex-grow"></div>
     
      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-primary">
          <FaBell className="text-xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-primary">
          <FaQuestionCircle className="text-xl" />
        </button>
      </div>
    </div>
  );
};


export default Header;
