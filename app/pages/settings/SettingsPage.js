import React, { useContext } from 'react';
import Page from '../../components/layouts/Page';
import { Route, Switch, NavLink, Link, Redirect } from 'react-router-dom';
import ProfileInfoSettings from '../../components/settings/ProfileInfo';
import StateContext from '../../contextsProviders/StateContext';

function SettingsPage() {
  const appState = useContext(StateContext);

  return (
    <Page title="Settings">
      <main>
        {/* <!--Sidebar--> */}
        <div className="flex flex-wrap lg:flex-no-wrap">
          <div className="pt-0 h-16 lg:min-h-screen lg:pt-10 w-full lg:max-w-xs">
            <div className="text-3xl w-full text-center hidden lg:block lg:mb-6">Settings</div>
            <div className="flex justify-between text-xl w-full border-b px-6">
              <Link to="/">Home</Link>
              <Link to={`/profile/${appState.user.username}`}>Profile</Link>
            </div>
            <div className="mx-auto lg:px-6">
              <ul className="list-reset flex flex-row lg:flex-col text-center lg:text-left">
                <li className="mr-3 flex-1">
                  <NavLink
                    to="/settings/info"
                    className="block py-1 lg:py-3 pl-1 align-middle  no-underline hover:text-pink-500 border-b-2 border-gray-800 lg:border-gray-900 hover:border-pink-500"
                  >
                    <i className="fas fa-link pr-0 lg:pr-3"></i>
                    <span className="pb-1 lg:pb-0 text-xs lg:text-base block lg:inline-block">
                      Profile Information
                    </span>
                  </NavLink>
                </li>
                <li className="mr-3 flex-1">
                  <NavLink
                    to="/settings/change-password"
                    className="block py-1 lg:py-3 pl-1 align-middle  no-underline hover:text-pink-500 border-b-2 border-gray-800 lg:border-gray-900 hover:border-pink-500"
                  >
                    <i className="fas fa-link pr-0 lg:pr-3"></i>
                    <span className="pb-1 lg:pb-0 text-xs lg:text-base block lg:inline-block">
                      Change Password
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* CONTENTS */}
          <div className="w-full mt-6 lg:mt-0 bg-gray-200">
            <Switch>
              <Route path="/settings/info">
                <ProfileInfoSettings />
              </Route>
              <Route path="/settings/change-password">
                <div>changePassword</div>
              </Route>
              <Route path="/settings/delete-account">
                <div>delete account</div>
              </Route>
              <Route>
                <Redirect to="/settings/info" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </Page>
  );
}

export default SettingsPage;

{
  /* <div className="bg-gray-200 font-mono">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Account Setting</h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full lg:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-text-1"
                  >
                    email address
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    type="text"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="w-full lg:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    password
                  </label>
                  <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">
                    change your password
                  </button>
                </div>
                <div className="w-full lg:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    pick your country
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                      <option>choose ...</option>
                      <option>USA</option>
                      <option>France</option>
                      <option>Spain</option>
                      <option>UK</option>
                    </select>
                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    fav language
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <select className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                      <option>choose ...</option>
                      <option>English</option>
                      <option>France</option>
                      <option>Spanish</option>
                    </select>
                    <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="Profile w-full border-t border-gray-400 pt-4">
                  <h2 className="text-2xl text-gray-900">Profile info:</h2>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-full lg:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        first name
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        last name
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      user name
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      required
                    />
                  </div>
                  <div className="w-full lg:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Bio
                    </label>
                    <textarea
                      className="bg-gray-200 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                      type="submit"
                    >
                      save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */
}