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

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true;
  }
};

interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  token: string;
  isLoggedIn: boolean;
  userPfp: string;
  loading: boolean;
  getUserDetails: () => Promise<void>;
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
      // Check if token is expired before using it
      if (isTokenExpired(userToken)) {
        // Token expired, clear it from localStorage
        localStorage.removeItem("token");
        setToken("");
        return;
      }
      setToken(userToken);
      return;
    }
    if (session?.user?.customToken) {
      if (isTokenExpired(session.user.customToken)) {
        return;
      }
      setToken(session.user.customToken);
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
      // Check if token is expired before decoding
      if (isTokenExpired(token)) {
        // Token expired, clear everything
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setUserDetails(null);
        setUserPfp("");
        return;
      }
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
      // Clear invalid token
      localStorage.removeItem("token");
      setToken("");
    }
  }, [token]);

  const getUserDetails = useCallback(async () => {
    try {
      // Check if token is expired before making API call
      if (!token || isTokenExpired(token)) {
        // Token expired, clear everything
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setUserDetails(null);
        setUserPfp("");
        return;
      }

      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setUserDetails(null);
        setUserPfp("");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await res.json();
      setUserDetails(data.user);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchUserPfp = useCallback(async () => {
    try {
      if (!token) return;

      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setUserDetails(null);
        setUserPfp("");
        return;
      }

      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setUserDetails(null);
        setUserPfp("");
        return;
      }

      if (!res.ok) {
        return;
      }

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
        getUserDetails,
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
