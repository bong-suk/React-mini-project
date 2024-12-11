import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../contexts/useSupabaseAuth";
import { useUser } from "../contexts/UserContext";
import Input from "../components/common/Input";
import { validateEmail, validatePassword } from "../utils/validation";
import "./Login.css";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result?.user) {
      setUser(result.user);
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <h2>로그인</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <Input
                label="이메일"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
                placeholder="이메일을 입력하세요"
              />
              <Input
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="button-container">
              <button type="submit" className="login-button">
                로그인
              </button>
            </div>

            <SocialLogin />
          </form>
        </div>
        <div className="login-divider"></div>
      </div>
    </div>
  );
};

export default Login;
