import { NextPage } from "next";
import BurnPawnToken from "components/QueensGambit";

const TransferPage: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <div className="flex justify-center mt-4">
          <BurnPawnToken />
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
