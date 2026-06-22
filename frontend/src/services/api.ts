const API_URL = "http://127.0.0.1:8000";

export async function analyzeCandidates(
  jd: string,
  files: File[]
) {
  const formData = new FormData();

  formData.append("jd", jd);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${API_URL}/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Analysis Failed");
  }

  return response.json();
}