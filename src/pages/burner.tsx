import { NextPage } from "next";
import { useRouter } from 'next/router';
import BurnPawnToken from "components/QueensGambit";

const BurnPage: NextPage = () => {
  const router = useRouter();
  const { firebaseApp } = router.query;

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <div className="flex justify-center mt-4">
          {/* Pass the firebaseApp prop to the BurnPawnToken component */}
          <BurnPawnToken firebaseApp={firebaseApp} />
        </div>
      </div>
    </div>
  );
};

export default BurnPage;
