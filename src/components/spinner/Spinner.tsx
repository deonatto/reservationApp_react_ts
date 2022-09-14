import { CSSProperties } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Spinner: React.FC = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    marginTop: "40px",
  };

  return <FadeLoader cssOverride={override} color="#1b36e5" />;
};

export default Spinner;