import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RingLoader color="#38346d" size={150} />
    </div>
  );
}
