'use server';
export const nextImage = async (folderId: string) => {
  const res = await fetch(`http://localhost:3000/api/folder/${folderId}`);
  const { url, interval } = await res.json();

  const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/select_image`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, interval, resetTimer: true }),
  });

  return response.json();
};
