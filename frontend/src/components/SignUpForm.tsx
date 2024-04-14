import { useContext } from 'react';
import { signUp } from 'aws-amplify/auth';
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom';
import { PasswordContext } from '../App';

export function SignUpForm() {
  const actionData = useActionData() as {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const { setPassword } = useContext(PasswordContext);

  return (
    <Form method="POST" className="w-[375px] px-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          className="block text-gray-700 text-sm font-bold "
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          autoComplete="on"
          name="email"
          placeholder="Email"
        />
        {actionData && actionData.email && (
          <p className="text-red-500 text-xs">{actionData.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          className="block text-gray-700 text-sm font-bold "
          htmlFor="password"
        >
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          name="password"
          placeholder="******************"
        />
        {actionData && actionData.password && (
          <p className="text-red-500 text-xs">{actionData.password}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          className="block text-gray-700 text-sm font-bold "
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="******************"
        />
        {actionData && actionData.confirmPassword && (
          <p className="text-red-500 text-xs">{actionData.confirmPassword}</p>
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign Up
      </button>
    </Form>
  );
}

export const singUpAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  const email = userData.email.toString();
  const password = userData.password.toString();
  const confirmPassword = userData.confirmPassword.toString();

  if (email.includes('@') === false) {
    return {
      email: 'Invalid email',
    };
  }

  if (password.length < 8) {
    return {
      password: 'Password must be at least 8 characters long',
      confirmPassword: 'Password must be at least 8 characters long',
    };
  }

  if (password !== confirmPassword) {
    return {
      confirmPassword: 'Passwords do not match',
      password: 'Passwords do not match',
    };
  }

  try {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
    return redirect(`/sign-up/confirm/${email}`);
  } catch (error) {
    const err = error as Error;

    const message = err.message.toString() || 'An error occurred';
    if (message.toLocaleLowerCase().includes('password')) {
      const passwordMessage = message.split(': ')[1];
      return {
        password: passwordMessage,
        confirmPassword: passwordMessage,
      };
    }
    return {
      email: message,
    };
  }
};
