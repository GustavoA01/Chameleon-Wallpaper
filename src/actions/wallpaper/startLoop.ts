'use server';
export const startLoop = async (deviceId: string) => {
  const url = `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/image_loop`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ deviceId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  } catch (error) {
    console.error('Error starting image loop:', error);
  }
};
