import { useContext } from 'react';
import { confirmSignUp, signIn } from 'aws-amplify/auth';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router-dom';
import { PasswordContext } from '../App';

export function ConfirmSignUpForm() {
  const actionData = useActionData() as {
    confirmationCode?: string;
  };

  const { email } = useLoaderData() as { email: string };

  const { password } = useContext(PasswordContext);

  return (
    <Form method="POST" className="w-[375px] px-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          className="block text-gray-700 text-sm font-bold "
          htmlFor="code"
        >
          Confirmation Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmationCode"
          type="text"
          autoComplete="off"
          name="confirmationCode"
        />
        {actionData && actionData.confirmationCode && (
          <p className="text-red-500 text-xs">{actionData.confirmationCode}</p>
        )}

        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="password" value={password ?? ''} />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Confirm sign up
      </button>
    </Form>
  );
}

export const confirmSignUpLoader: LoaderFunction = async ({ params }) => {
  return { email: params.email };
};

export const confirmSignUpAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  const email = userData.email as string;
  const code = userData.confirmationCode as string;
  const password = userData.password as string;

  try {
    await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    if (password.length > 0) {
      await signIn({
        username: email,
        password,
      });
      return redirect(`/`);
    }
    return redirect(`/sign-in?email=${email}`);
  } catch (error) {
    const err = error as Error;
    return {
      confirmationCode: err.message,
    };
  }
};
