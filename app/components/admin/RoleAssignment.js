import React from 'react';

function RoleAssignment() {
  return (
    <div className="">
      <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
        <h3 className="font-bold pl-2">Role Assignment</h3>
      </div>

      <div className="flex flex-wrap bg-white justify-center">
        <div className="px-6 py-4 whitespace-no-wrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm leading-5 font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm leading-5 text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 whitespace-no-wrap">
          <div className="text-sm leading-5 text-gray-900">Regional Paradigm Technician</div>
          <div className="text-sm leading-5 text-gray-500">Optimization</div>
        </div>
        <div className="px-6 py-4 whitespace-no-wrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </div>
        <div className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">Admin</div>
        <div className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}

export default RoleAssignment;
