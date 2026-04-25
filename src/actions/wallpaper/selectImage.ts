'use server';
export const selectImage = async (url: string) => {
  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/select_image`;

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    return response.json();
  } catch (error) {
    console.error('Error selecting image:', error);
    throw error;
  }
};
