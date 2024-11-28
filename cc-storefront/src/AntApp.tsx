import { App } from "antd";
import { IProps } from "@/interfaces/IProps";

const AntApp: React.FC<IProps> = ({ children }) => {
  return <App>{children}</App>;
};

export default AntApp;
