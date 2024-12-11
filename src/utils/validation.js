export const validateName = (name) => {
  if (!name) return "이름을 입력해주세요";
  const regex = /^[가-힣a-zA-Z0-9]{2,8}$/;
  if (!regex.test(name)) return "이름은 2~8자의 한글, 영문, 숫자만 가능합니다";
  return "";
};

export const validateEmail = (email) => {
  if (!email) return "이메일을 입력해주세요";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "올바른 이메일 형식이 아닙니다";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "비밀번호를 입력해주세요";
  if (password.length < 6) return "비밀번호는 최소 6자 이상이어야 합니다";
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "비밀번호 확인을 입력해주세요";
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다";
  return "";
};
