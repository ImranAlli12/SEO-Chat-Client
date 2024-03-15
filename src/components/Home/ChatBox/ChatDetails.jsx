import React, { useEffect, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../assets/file.jpeg"
export default function ChatDetails() {
  const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // find group admin
  const groupAdmin = () => {
    const admin = selectedUserForChat.users.find(user => user._id === selectedUserForChat.groupAdmin);
    return admin.name
  }


  return (
    <section>
      <button className="bg-white text-yellow-500 p-2 rounded-full hover:bg-green-200 focus:outline-none" onClick={toggleModal}>
        <BsInfoCircle size={24} />
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-primary-50 text-green-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{selectedUserForChat.chatName}</h2>
              <button className="hover:text-yellow-400 text-yellow-500 rounded-md py-1 px-2" onClick={toggleModal}>
                <AiOutlineCloseCircle size={'25px'} />
              </button>
            </div>

            {/* total members */}
            <p className="text-md font-semibold text-primary-800 truncate mt-4"> Group Admin - <span className='font-normal'> {groupAdmin()} </span></p>
            <p className="text-md font-semibold text-primary-800 truncate mt-1"> Total Members - <span className='font-normal'> {selectedUserForChat.users.length}  </span> </p>

            {/* group members */}
            <div className='max-h-[50vh] min-w-[20vw] overflow-y-auto p-2'>
              {selectedUserForChat.users?.map((item) => (
                <div key={item.id} className=" bg-green-200 hover:bg-green-300 cursor-pointer flex items-center space-x-4 p-2 shadow-lg rounded-lg mt-4">
                  <div className={`bg-primary-50 rounded-full w-11 h-11 flex items-center justify-center`}>
                    <img className="w-10 h-10 rounded-full" src={logo} alt={`${item.name} image`} />
                    
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-semibold text-primary-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-primary-400 truncate">
                      {item.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
