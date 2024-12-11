import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const useSocialAuth = () => {
  const signInWithKakao = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          queryParams: {
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          },
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Kakao login error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  return {
    signInWithKakao,
    signInWithGoogle,
  };
};
