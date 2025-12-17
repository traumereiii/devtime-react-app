export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file); // base64로 읽기

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
