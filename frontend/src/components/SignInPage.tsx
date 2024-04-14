import { useContext } from 'react';
import { signIn } from 'aws-amplify/auth';
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom';
import { PasswordContext } from '../App';

export function SignInPage() {
  const actionData = useActionData() as {
    email?: string;
    password?: string;
  };

  const { setPassword } = useContext(PasswordContext);

  return (
    <div className="flex justify-center min-h-dvh items-center">
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
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******************"
          />
          {actionData && actionData.password && (
            <p className="text-red-500 text-xs">{actionData.password}</p>
          )}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </Form>
    </div>
  );
}

export const singInAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  const email = userData.email.toString();
  const password = userData.password.toString();

  try {
    const response = await signIn({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
    if ((response.nextStep.signInStep as string) === 'CONFIRM_SIGN_UP') {
      return redirect(`/sign-up/confirm/${email}`);
    }
    return redirect(`/`);
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

    if (message.toLocaleLowerCase().includes('not confirmed')) {
      return redirect(`/sign-up/confirm/${email}`);
    }

    return {
      email: message,
    };
  }
};
