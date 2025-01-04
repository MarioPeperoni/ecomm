export default function TitleBox() {
  return (
    <div className="mt-20 flex max-w-xl flex-col lg:max-w-2xl">
      <h2 className="mb-2 text-3xl font-bold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-5xl">
        Welcome to
      </h2>
      <h1 className="animate-gradient text-nowrap bg-[linear-gradient(to_right,theme(colors.pink.500),theme(colors.purple.500),theme(colors.indigo.500),theme(colors.blue.500),theme(colors.indigo.500),theme(colors.purple.500),theme(colors.pink.500))] bg-[length:200%_auto] bg-clip-text pb-6 text-6xl font-extrabold leading-[1.2] text-transparent peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-8xl">
        U-commerce
      </h1>
      <h2 className="text-lg font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Your Personalized E-commerce Experience
      </h2>
    </div>
  );
}
