import { Boxes } from "lucide-react";
import Link from "next/link";

type LogoProps = {
  href?: string;
};

export const Logo = ({ href }: LogoProps) => {
  return (
    <Link href={href ? href : "/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden lg:flex">
        <p className="text-lg text-neutral-700 pb-1 flex flex-row ml-2">
          Cert
          <Boxes />
          Chain
        </p>
      </div>
    </Link>
  );
};
