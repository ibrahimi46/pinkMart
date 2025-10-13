import AuthNavbar from "./components/AuthNavbar";
import CreatePassword from "./components/CreatePassword";

const layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <AuthNavbar>
      <CreatePassword />
    </AuthNavbar>
  );
};

export default layout;
