export const updateInterval = async (intervalSeconds: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PYTHON_AGENT_URL}/update_interval`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interval: intervalSeconds }),
    });

    return response.json();
  } catch (error) {
    console.error('Error updating interval:', error);
    throw error;
  }
};
