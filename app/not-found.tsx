import Footer from '@/components/Footer';
import Header from "@/components/Header";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="my-3 text-3xl">looks like this frame is missing</h1>
        <p className="mb-8">
          the page you’re looking for doesn’t exist,
          <br />
          or the post may have been removed.
        </p>
        <Link href="/" className="button-primary">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
