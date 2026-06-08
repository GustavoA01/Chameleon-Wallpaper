'use server';

export const stopLoop = async () => {
  const url = `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/stop_loop`;

  try {
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error stopping image loop:', error);
  }
};
