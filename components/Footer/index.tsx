import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-teal text-center p-4">
      <h4>© 2026 frame by claudia pc</h4>
      <div className="flex justify-center gap-4 text-xl mt-2">
        <button className="footer-button">
          <Link href="/about">
            <FontAwesomeIcon icon={faCircleInfo} />
          </Link>
        </button>
        <button className="footer-button">
          <a href="https://www.linkedin.com/in/claudia-pereira-carion/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </button>
        <button className="footer-button">
          <a href="https://github.com/claudiacarion" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithubAlt} />
          </a>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
