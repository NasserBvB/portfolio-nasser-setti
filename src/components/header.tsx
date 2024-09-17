import Link from "next/link";
import { cn } from "../utils";

const Header = () => {
  return (
    <header className="flex sticky top-0 z-20 bg-slate-300 dark:bg-slate-600 rounded-br-md rounded-bl-md">
      <Links_elements
        urls={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Blogs",
            href: "/blogs",
          },
          {
            label: "About",
            href: "/about",
          },
          {
            label: "Contact",
            href: "/contact",
          },
        ]}
      />
    </header>
  );
};

export default Header;

const Links_elements = ({
  urls,
}: {
  urls: { label: string; href: string }[];
}) => {
  return (
    <div className="flex items-center flex-wrap h-full flex-1">
      {urls.map(({ label, href }, index) => (
        <HeaderLink key={index} index={index} url={href} title={label} />
      ))}
    </div>
  );
};

const HeaderLink = ({
  index,
  url,
  title,
}: {
  index: number;
  url: string;
  title: string;
}) => {
  return (
    <Link
      title={title}
      key={index}
      prefetch={true}
      href={url}
      replace={true}
      rev="canonical"
      aria-description={title}
      className={cn(
        "cursor-pointer hover:bg-[#4A5A05] hover:dark:bg-green-700 hover:text-white",
        "hover:shadow-sm hover:shadow-[#4A5A05] hover:dark:shadow-green-700",
        "flex h-full gap-2 justify-center items-center px-2 py-1",
        "rounded-b-md",
        title === "Home" ? "mr-auto" : "mr-0"
      )}
    >
      {title}
    </Link>
  );
};
