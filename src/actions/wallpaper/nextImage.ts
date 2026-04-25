'use server';
export const nextImage = async (folderId: string) => {
  const res = await fetch(`http://localhost:3000/api/folder/${folderId}`);
  const { url } = await res.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/next_image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    }
  );

  return response.json();
};
