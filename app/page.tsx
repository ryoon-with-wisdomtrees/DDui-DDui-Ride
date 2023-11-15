import Image from "next/image";
import SearchSection from "./components/Home/SearchSection";
import GoogleMapSection from "./components/Home/GoogleMapSection";

export default function Home() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <SearchSection />
      <GoogleMapSection />
    </div>
  );
}
