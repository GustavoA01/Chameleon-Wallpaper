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

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);
      throw new Error('O Python retornou um erro.');
    }

    return response.json();
  } catch (error) {
    console.error('Error starting image loop:', error);
  }
};
