interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="mx-2 max-w-7xl lg:mx-auto">{children}</div>;
}
