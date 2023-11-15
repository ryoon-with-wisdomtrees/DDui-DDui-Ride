import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  const headerMenu = [
    {
      id: 1,
      name: "Ride",
      icon: "/taxi.png",
    },
    {
      id: 2,
      name: "Package",
      icon: "/box.png",
    },
  ];
  return (
    <div className="p-4 pb-3 pl-10 border-b-[4px] border-gray-200m flex items-center justify-between">
      <div className="flex gap-24 items-center">
        <Image src="/Uber-Logo.png" alt="logo" width={70} height={70} />
        <div className=" flex flex-row gap-6 items-center ">
          {headerMenu.map((item) => (
            <div className="flex flex-row gap-2 items-center ">
              <Image src={item.icon} alt="icon" width={17} height={17} />
              <h2 className="text-[14px] font-medium">{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
