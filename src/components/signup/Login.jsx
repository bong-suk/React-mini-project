import React, { useState } from "react";
import Input from "../../components/signup/Input"; // 경로 수정
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../../contexts/useSupabaseAuth";

function Login() {
  const { login } = useSupabaseAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "비밀번호는 영어 대문자/소문자 + 숫자 조합으로 8자 이상이어야 합니다.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { user, error } = await login({ email, password });

      if (error) {
        console.error("로그인 실패:", error.message);
      } else {
        console.log("로그인 성공:", user);
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <Input
        label="이메일"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
