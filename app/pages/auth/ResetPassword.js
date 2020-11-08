import React, { useEffect, useContext } from 'react';
import Page from '../../components/layouts/Page';
import { Link, withRouter } from 'react-router-dom';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import StateContext from '../../contextsProviders/StateContext';

function ResetPassword() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    email: {
      value: '',
      hasErrors: false,
      message: '',
      isRegisteredEmail: false,
      checkCount: 0,
    },
    isLoggingIn: false,
    showNextStep: false,
    submitCount: 0,
  };

  function reducer(draft, action) {
    switch (action.type) {
      case 'emailImmediately':
        draft.email.hasErrors = false;
        draft.email.value = action.value.trim();
        if (!draft.email.value) {
          draft.email.hasErrors = true;
          draft.email.message = 'Email field is required, please.';
        }
        return;
      case 'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = 'Please provide a valid email.';
        }
        if (!draft.email.hasErrors) {
          draft.email.checkCount++;
        }
        return;
      case 'isRegisteredEmail':
        if (!action.value) {
          draft.email.hasErrors = true;
          draft.email.isRegisteredEmail = false;
          draft.email.message = 'No account with that email address exists.';
        } else {
          draft.email.isRegisteredEmail = true;
        }
        return;
      case 'isSendingTokenStart':
        draft.isLoggingIn = true;
        return;
      case 'isSendingTokenFinished':
        draft.isLoggingIn = false;
        return;
      case 'showNextStep':
        draft.showNextStep = true;
        return;
      case 'closeAlert':
        draft.showNextStep = false;
        return;
      case 'submitForm':
        if (draft.email.value != '' && !draft.email.hasErrors && draft.email.isRegisteredEmail) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // EMAIL IS UNIQUE
  useEffect(() => {
    if (state.email.checkCount) {
      const request = Axios.CancelToken.source();
      (async function checkForEmail() {
        try {
          const response = await Axios.post(
            '/doesEmailExist',
            { email: state.email.value },
            { cancelToken: request.token }
          );
          dispatch({ type: 'isRegisteredEmail', value: response.data });
        } catch (error) {
          console.log('Having difficulty looking up your email. Please try again.');
        }
      })();
      return () => request.cancel();
    }
  }, [state.email.checkCount]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: 'emailAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  useEffect(() => {
    if (state.submitCount && state.submitCount < 5) {
      const request = Axios.CancelToken.source();
      dispatch({ type: 'isSendingTokenStart' });

      (async function submitEmail() {
        try {
          const response = await Axios.post(
            '/reset-password',
            { email: state.email.value },
            { cancelToken: request.token }
          );

          dispatch({ type: 'isSendingTokenFinished' });

          if (response.data == 'Success') {
            dispatch({ type: 'showNextStep' });
          } else {
            appDispatch({ type: 'flashMessageError', value: response.data });
          }
        } catch (error) {
          dispatch({ type: 'isSendingTokenFinished' });
          appDispatch({
            type: 'flashMessageError',
            value: "Sorry, there's a problem requesting a token. Please try again.",
          });
        }
      })();

      return () => request.cancel();
    }
  }, [state.submitCount]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'emailImmediately', value: state.email.value });
    dispatch({ type: 'emailAfterDelay', value: state.email.value });
    dispatch({ type: 'submitForm' });
  }

  return (
    <Page title="Step 1 of 2: Enter Email">
      <div className="flex flex-wrap w-full">
        {/* <!-- Form Section --> */}
        <div className="flex flex-col w-full lg:w-1/3">
          {/* LOGO */}
          <div className="flex justify-center bg-gray-900">
            <Link to="/" className="p-4 text-xl font-bold text-white focus:outline-none">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>
          {/* FORM */}
          <p className="text-3xl text-center pt-5">Password Recovery</p>
          <p className="text-center text-lg mb-4 px-3">Step 1 of 2:</p>
          <form onSubmit={handleSubmit} className="flex flex-col p-3">
            {/* EMAIL */}
            <div className="relative flex flex-col">
              {state.showNextStep && (
                <div className="absolute z-10 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3">
                  <svg
                    className="fill-current w-20 h-20 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                  </svg>
                  <p>
                    Check your email inbox at{' '}
                    <span className="font-bold text-red-300">{state.email.value}</span> for further
                    instruction. Check your SPAM folder if you cannot locate the email in your
                    regular inbox.
                  </p>
                  <span
                    onClick={() => dispatch({ type: 'closeAlert' })}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
              <label className="text-lg" htmlFor="email">
                Enter Your Email <span className="text-red-600">*</span>
              </label>
              <input
                onChange={e => dispatch({ type: 'emailImmediately', value: e.target.value })}
                id="email"
                autoComplete="off"
                className="w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
              />
              <CSSTransition
                in={state.email.hasErrors}
                timeout={330}
                className="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.email.message}
                </div>
              </CSSTransition>
            </div>
            {/* SUBMIT BTN */}
            <button
              type="submit"
              className="p-2 mt-8 text-lg font-bold text-white bg-black hover:bg-gray-700"
            >
              {state.isLoggingIn ? (
                <span>
                  <i className="text-sm fa fa-spinner fa-spin"></i>
                </span>
              ) : (
                <>Login In</>
              )}
            </button>
          </form>
          <div className="pt-12 pb-12 text-center">
            <p>
              Remember your password?
              <Link
                to="/login"
                className="font-semibold underline px-2 focus:outline-none hover:text-gray-800 focus:text-gray-700"
              >
                Login in here.
              </Link>
            </p>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 shadow-2xl custom-layout-bg">
          <div className="hidden w-full h-screen lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(ResetPassword);