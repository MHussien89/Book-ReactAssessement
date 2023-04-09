import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "inline-block",
  position: "relative",
  left: "50%",
  top: "200px",
  borderColor: "regreend",
};

const Spinner = () => {

  return (
    <ClipLoader
      color="green"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />)
};

export default Spinner;
