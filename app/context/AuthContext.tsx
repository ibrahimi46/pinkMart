import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";
import { User, UserDetails } from "@/types";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  token: string;
  isLoggedIn: boolean;
  userPfp: string;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setUserPfp: React.Dispatch<React.SetStateAction<string>>;
  fetchUserPfp: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userPfp, setUserPfp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const isLoggedIn = !!user;

  // On mount identifies the user token
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      return;
    }
    if (session?.user?.customToken) {
      setToken(session?.user?.customToken);
    }
  }, [session]);

  // Decode user from token
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  // Fetch user details when user is available
  useEffect(() => {
    if (user && token) {
      getUserDetails();
    }
  }, [user, token]);

  // Fetch user profile picture when token is available
  useEffect(() => {
    if (token) {
      fetchUserPfp();
    }
  }, [token]);

  // User Functions
  const getUser = useCallback(() => {
    try {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    }
  }, [token]);

  const getUserDetails = useCallback(async () => {
    try {
      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserDetails(data.user);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchUserPfp = useCallback(async () => {
    try {
      if (!token) return;

      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data?.user?.image) {
        setUserPfp(data.user.image);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const logout = useCallback(async () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setUserDetails(null);
    setUserPfp("");

    if (session) {
      const { signOut } = await import("next-auth/react");
      signOut({ callbackUrl: "/" });
    } else {
      window.location.href = "/";
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        token,
        isLoggedIn,
        userPfp,
        loading,
        setLoading,
        setUserPfp,
        fetchUserPfp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
