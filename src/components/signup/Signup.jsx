import React, { useState } from "react";
import Input from "../../components/signup/Input"; // 경로 수정
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../../contexts/useSupabaseAuth";

function Signup() {
  const { signUp } = useSupabaseAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (!nameRegex.test(name)) {
      newErrors.name = "이름은 2~8자 사이 숫자, 한글, 영어만 사용 가능합니다.";
    }

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

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { user, error } = await signUp({
        email,
        password,
        userName: name,
      });

      if (result?.error) {
        console.error("회원가입 실패:", result.error.message);
      } else if (result?.user) {
        console.log("회원가입 성공:", result.user);
        navigate("/login");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <Input
        label="이름"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        error={errors.name}
      />
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
      <Input
        label="비밀번호 확인"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <button type="submit">가입하기</button>
    </form>
  );
}

export default Signup;
