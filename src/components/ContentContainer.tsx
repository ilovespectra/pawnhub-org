import { FC, useState } from 'react';
import Link from "next/link";

export const ContentContainer: FC = props => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={`flex-1 drawer h-52 ${isDrawerOpen ? 'drawer-open' : ''}`}>
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" checked={isDrawerOpen} onChange={() => setIsDrawerOpen(!isDrawerOpen)} />
      <div className="items-center drawer-content h-full">
        {props.children}
      </div>

      {/* SideBar / Drawer */}
      <div className={`drawer-side ${isDrawerOpen ? 'drawer-open' : ''}`}>
        <label htmlFor="my-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li onClick={closeDrawer}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link href="/tokenomics">
              <a>Tokenomics</a>
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link href="/checkmate">
              <a>Check Mate</a>
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link href="/queensgambit">
              <a>Queen&apos;s Gambit</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
