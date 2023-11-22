"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  return (
    <div className="p-4 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
      <div className="flex gap-24 items-center">
        <Image
          src="/DduiDdui_Ryoon.png"
          alt="logo"
          width={100}
          height={100}
          onClick={() => {
            router.push("/");
          }}
        />
        <div className=" flex flex-row gap-6 items-center ">
          {headerMenu.map((item, index) => (
            <div key={index} className="flex flex-row gap-2 items-center ">
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
