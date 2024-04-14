import { Outlet } from 'react-router-dom';

export function SignUpPage() {
  return (
    <div className="flex justify-center min-h-dvh items-center">
      <Outlet />
    </div>
  );
}
