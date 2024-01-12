import NavBar from "@/app/ui/navbar";
import AuthProvider from "@/app/ui/auth-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <NavBar isHome={true} />
      </AuthProvider>
      {children}
    </>
  );
}
