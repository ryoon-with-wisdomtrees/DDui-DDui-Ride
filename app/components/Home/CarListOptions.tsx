import { CarListData } from "@/utils/CarListData";
import React, { useState } from "react";
import CarListItem from "./CarListItem";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = { distance: any };

const CarListOptions = ({ distance }: Props) => {
  const [activeIndex, setActiveIndex] = useState<any>();
  const [selectedCar, setSelectedCar] = useState<any>([]);
  const router = useRouter();
  return (
    <div className="mt-5 p-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          className={`cursor-pointer my-2  px-4 rounded-md  bg-slate-200  border-black  hover:border-[3px] ${
            activeIndex === index && "border-[3px]"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}
      {selectedCar?.name && (
        <div className="flex justify-center z-50 fixed bottom-10 bg-white p-3 shadow-xl rounded-lg w-full  md:w-[30%] border-[1px] items-center">
          <Button
            className="p-3 bg-black text-white rounded-lg
          text-center"
            onClick={() =>
              router.push(
                "/payment?amount=" + (selectedCar.amount * distance).toFixed(2)
              )
            }
          >
            {selectedCar.name}
          </Button>
          <h2>로 결제하기</h2>
        </div>
      )}
    </div>
  );
};

export default CarListOptions;
