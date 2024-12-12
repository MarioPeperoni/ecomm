export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto py-10">
        <div className="text-sx text-center">
          <span>&copy; {new Date().getFullYear()} </span>
          <span className="font-semibold text-primary">U-commerce</span>
          <span>, All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
