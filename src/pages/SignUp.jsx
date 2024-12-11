import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../contexts/useSupabaseAuth";
import Input from "../components/common/Input";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {
      userName: validateName(formData.userName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        userName: formData.userName,
      });

      if (result?.error) {
        console.error("회원가입 오류:", result.error.message);
        alert(result.error.message);
        return;
      }

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-title">회원가입</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <Input
            label="이름"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            error={errors.userName}
            placeholder="이름을 입력하세요"
          />
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
          <Input
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            placeholder="비밀번호를 다시 입력하세요"
          />
          <button type="submit" className="signup-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
