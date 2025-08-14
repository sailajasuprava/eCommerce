import { LoaderCircle } from "lucide-react";

function Spinner() {
  return (
    <div className="grid justify-center mt-40">
      <LoaderCircle size={40} className="animate-spin" />
    </div>
  );
}

export default Spinner;
