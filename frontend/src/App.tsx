import { createContext, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const PasswordContext = createContext({
  password: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPassword: (_password: string) => {},
});

export function App() {
  const [password, setPassword] = useState('');

  return (
    <PasswordContext.Provider value={{ password, setPassword }}>
      <RouterProvider router={router} />
    </PasswordContext.Provider>
  );
}
