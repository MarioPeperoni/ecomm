interface LoginErrorProps {
  message?: string;
}

export const LoginError = ({ message }: LoginErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center gap-x-2 bg-destructive/20 p-3 text-sm text-destructive">
      <p>{message}</p>
    </div>
  );
};
