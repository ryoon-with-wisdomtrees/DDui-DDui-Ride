import { User2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  car: any;
  distance: any;
};

const CarListItem = ({ car, distance }: Props) => {
  return (
    <div className="">
      <div className="flex items-center justify-between mt-5 ">
        <div className="flex items-center gap-5">
          <Image src={car.image} alt="" width={100} height={100} />
          <div>
            <h2 className="font-semibold text-[18px] flex gap-3">{car.name}</h2>
            <span className="flex gap-2 items-center text-[14px] font-normal">
              <User2 />
              {car.seat}
            </span>
            <p>{car.desription}</p>
          </div>
        </div>

        <h2 className="text-[18px] font-semibold">
          ${(car.amount * distance).toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default CarListItem;
