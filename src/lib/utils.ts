// 앞뒤 공백 허용 X, 대소문자 구분 X
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export function isValidEmail(email: string) {
  return emailRegex.test(email);
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file); // base64로 읽기

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
