export const selectFolder = async (folderId: string) => {
  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/select_image`;

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folderId }),
    });

    return response.json();
  } catch (error) {
    console.error('Error selecting folder:', error);
    throw error;
  }
};
