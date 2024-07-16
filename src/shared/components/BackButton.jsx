import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type={"back"}
      action={e => {
        //in case it's inside a form
        e?.preventDefault();
        navigate("../");
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
