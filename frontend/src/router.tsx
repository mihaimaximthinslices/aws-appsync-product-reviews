import { createBrowserRouter, redirect } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { SignUpPage } from './components/SignUpPage';
import {
  ConfirmSignUpForm,
  confirmSignUpAction,
  confirmSignUpLoader,
} from './components/ConfirmSignUpForm';
import { SignUpForm, singUpAction } from './components/SignUpForm';
import { SignInPage, singInAction } from './components/SignInPage';
import { DashboardPage } from './components/DashboardPage';
import { amplifyConfig } from './amplify';

Amplify.configure(amplifyConfig);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    loader: async () => {
      try {
        await getCurrentUser();
        return null;
      } catch (error) {
        return redirect('/sign-in');
      }
    },
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    loader: async () => {
      try {
        await getCurrentUser();
        return redirect('/');
      } catch (error) {
        return null;
      }
    },
    children: [
      { index: true, element: <SignUpForm />, action: singUpAction },
      {
        path: 'confirm/:email',
        element: <ConfirmSignUpForm />,
        loader: confirmSignUpLoader,
        action: confirmSignUpAction,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
    loader: async () => {
      try {
        await getCurrentUser();
        return redirect('/');
      } catch (error) {
        return null;
      }
    },
    action: singInAction,
  },
]);
