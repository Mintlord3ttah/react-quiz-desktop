import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useDataContext } from "../ContextAPI/DataContext";
import PageDivider from "./PageDivider";

export default function IntroductoryHome({ children }) {
  const { hoveringList } = useDataContext();
  return (
    <>
      <Nav />
      <div className="home-body flex-center">
        {children}
        {hoveringList && <PageDivider />}
      </div>
    </>
  );
}
