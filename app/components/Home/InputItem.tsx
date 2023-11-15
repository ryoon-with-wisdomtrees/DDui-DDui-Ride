import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  CircleDashed,
  CircleDot,
  CircleDotDashedIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  type: string;
  placeholder: string;
};

const InputItem = ({ type, placeholder }: Props) => {
  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      {type === "source" ? <CircleDotDashedIcon /> : <CircleDot />}
      <Input
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full outline-none"
      />
    </div>
  );
};

export default InputItem;
