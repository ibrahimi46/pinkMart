import AuthNavbar from "./components/AuthNavbar";

const layout = ({ children }: { children: React.ReactElement }) => {
  return <AuthNavbar>{children}</AuthNavbar>;
};

export default layout;
