import AuthNavbar from "./components/AuthNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthNavbar>{children}</AuthNavbar>;
}
