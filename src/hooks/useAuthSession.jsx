import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useSupabase } from "../contexts/useSupabaseAuth";

const useAuthSession = () => {
  const { setUser } = useUser();
  const supabase = useSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          profileImageUrl: session.user.user_metadata.profileImageUrl,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          profileImageUrl: session.user.user_metadata.profileImageUrl,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, supabase.auth]);
};

export default useAuthSession;
