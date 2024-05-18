"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavButton } from "./NavButton";
import { useState } from "react";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

interface Route {
  href: string;
  label: string;
}

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const { data: session } = useSession();
  const user = session?.user;

  const routes: Route[] = [
    {
      href: "/",
      label: "Overview",
    },
    ...(user
      ? [
          {
            href: "/courses",
            label: "Courses",
          },
        ]
      : []),
  ];

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal hover:bg-primary/30 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-primary focus:bg-primary/40 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
