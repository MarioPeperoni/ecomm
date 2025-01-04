import Link from "next/link";

import InfoCards from "@/components/home/cards/InfoCards";
import HomeNavbar from "@/components/home/navbar/Navbar";
import TitleBox from "@/components/home/titleBox/titleBox";
import Footer from "@/components/store/Footer";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";

import { SparklesIcon, Store } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Container>
        <TitleBox />
        <div className="my-10 flex justify-center">
          <Link href={"/explore"}>
            <Button size={"lg"} className="w-64" effect={"rainbowGlow"}>
              <>
                <SparklesIcon />
                <span>Explore stores</span>
              </>
            </Button>
          </Link>
        </div>
        <InfoCards />
        <div className="my-10 flex justify-center">
          <Link href={"/create"}>
            <Button size={"lg"} className="w-64" effect={"ringHover"}>
              <>
                <Store />
                <span>Create your own store!</span>
              </>
            </Button>
          </Link>
        </div>
      </Container>
      <Footer />
    </>
  );
}
