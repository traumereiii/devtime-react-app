// 앞뒤 공백 허용 X, 대소문자 구분 X
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export function isValidEmail(email) {
  return emailRegex.test(email);
}
