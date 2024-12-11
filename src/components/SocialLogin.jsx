import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useSocialAuth } from "../contexts/useSocialAuth";
import "./SocialLogin.css";

const SocialLogin = () => {
  const { signInWithKakao, signInWithGoogle } = useSocialAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    try {
      const data = await signInWithKakao();
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          profileImageUrl: data.user.user_metadata?.avatar_url,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Kakao login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          profileImageUrl: data.user.user_metadata?.avatar_url,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="social-login-container">
      <button onClick={handleKakaoLogin} className="kakao-login-btn">
        카카오로 로그인
      </button>
      <button onClick={handleGoogleLogin} className="google-login-btn">
        구글로 로그인
      </button>
    </div>
  );
};

export default SocialLogin;
