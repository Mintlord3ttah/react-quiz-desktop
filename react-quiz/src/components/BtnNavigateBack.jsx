import { useNavigate } from "react-router-dom";
import Button from "./Button";
export default function BtnNavigateBack({ text }) {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/")}>👈 {text}</Button>;
}
