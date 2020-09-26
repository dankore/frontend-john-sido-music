import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StateContext from '../../contextsProviders/StateContext';

function ReuseableModal({ user, type, headerTitle, btnText, handleToggle, handleSubmit, loading }) {
  const appState = useContext(StateContext);

  function themeColor() {
    if (type == 'activate' || type == 'inactivate') {
      return type == 'activate' ? 'green' : 'red';
    }
    if (type == 'upgrade' || type == 'downgrade') {
      return type == 'upgrade' ? 'green' : 'indigo';
    }
    if (type == 'delete') {
      return 'red';
    }
  }

  function loggedInAdminBtnText() {
    switch (type) {
      case 'downgrade':
        return (
          <div>
            <span className="text-red-700 mr-2">WAIT!</span>
            <p className="my-3">Are you sure you want to downgrade yourself?</p>{' '}
            <p>You cannot be able to access this page again.</p>
          </div>
        );
      case 'activate':
        return <p>Activate your account?</p>;
      case 'inactivate':
        return <p>Deactivate your account?</p>;
      case 'delete':
        return <p>Delete your account?</p>;
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div onClick={handleToggle} className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-center">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${themeColor()}-100 sm:mx-0 sm:h-10 sm:w-10`}
              >
                <svg
                  className={`h-6 w-6 text-${themeColor()}-600`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {appState.user.username !== user.username && headerTitle}

                  {appState.user.username === user.username && loggedInAdminBtnText()}
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                onClick={handleSubmit}
                data-userid={user._id}
                data-username={user.username}
                data-type={type}
                type="button"
                className={`inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-${themeColor()}-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-${themeColor()}-500 focus:outline-none focus:border-${themeColor()}-700 focus:shadow-outline-${themeColor()} transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              >
                {loading ? (
                  <span>
                    <i className="fa text-sm fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  <>{btnText}</>
                )}
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={handleToggle}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ReuseableModal.propTypes = {
  btnText: PropTypes.string,
  type: PropTypes.string,
  headerTitle: PropTypes.string,
  handleToggle: PropTypes.func,
  handleSubmit: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
};

export default ReuseableModal;
