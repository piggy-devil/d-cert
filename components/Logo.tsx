import { Boxes } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <p className="text-lg text-neutral-700 pb-1 flex flex-row ml-2">
          Cert
          <Boxes />
          Chain
        </p>
      </div>
    </Link>
  );
};
