import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-black ">
      <Image
        src="/uber_banner.jpg"
        alt=""
        width={900}
        height={1000}
        className="object-contain h-hull w-full"
      />
      <div
        className="absolute top-40    
      left-2/4 right-2/4  flex flex-row justify-center items-center "
      >
        <SignUp />
      </div>
    </div>
  );
}
