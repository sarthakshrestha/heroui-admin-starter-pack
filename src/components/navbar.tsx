import { Kbd, Link, TextField, InputGroup } from "@heroui/react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { 
  Magnifier, 
  LogoTelegram as LogoTwitter, 
  LogoGithub, 
  LogoFacebook as LogoDiscord, 
  Heart,
  Cpu as LogoIcon
} from "@gravity-ui/icons";

export const Navbar = () => {
  const searchInput = (
    <TextField aria-label="Search" className="w-full">
      <InputGroup className="bg-default-100 rounded-lg">
        <InputGroup.Prefix className="pl-3">
          <Magnifier className="text-base text-default-400 pointer-events-none" />
        </InputGroup.Prefix>
        <InputGroup.Input 
          className="text-sm" 
          placeholder="Search..." 
        />
        <InputGroup.Suffix className="pr-3">
          <Kbd className="hidden lg:inline-block">
            K
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );

  return (
    <nav className="flex items-center justify-between px-6 py-4 w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-divider">
      <div className="flex items-center justify-start gap-4 basis-1/5 sm:basis-full">
        <div className="flex gap-3 max-w-fit items-center">
          <Link
            className="flex justify-start items-center gap-1 text-foreground"
            href="/"
          >
            <LogoIcon width={24} />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </div>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <div key={item.href}>
              <Link
                className={clsx(
                  "hover:text-primary transition-colors text-foreground",
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div
        className="hidden sm:flex items-center gap-4 basis-1/5 sm:basis-full justify-end"
      >
        <div className="hidden sm:flex gap-2 items-center">
          <Link href={siteConfig.links.twitter} aria-label="Twitter">
            <LogoTwitter className="text-default-500" />
          </Link>
          <Link href={siteConfig.links.discord} aria-label="Discord">
            <LogoDiscord className="text-default-500" />
          </Link>
          <Link href={siteConfig.links.github} aria-label="GitHub">
            <LogoGithub className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </div>
        <div className="hidden lg:flex min-w-64">{searchInput}</div>
        <div className="hidden md:flex">
          <Link
            className="text-sm font-normal text-default-600 bg-default-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-default-200 transition"
            href={siteConfig.links.sponsor}
          >
            <Heart className="text-danger" />
            Sponsor
          </Link>
        </div>
      </div>

      <div className="sm:hidden flex items-center justify-end basis-1 pl-4 gap-2">
        <Link href={siteConfig.links.github} aria-label="GitHub">
          <LogoGithub className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </div>

    </nav>
  );
};
