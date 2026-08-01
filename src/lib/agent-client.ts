// Avisa o agente local (mesma maquina do navegador) para buscar comandos
// imediatamente, sem esperar o proximo ciclo de polling. Fire-and-forget:
// se o agente nao estiver acessivel, o comando ainda sera aplicado no
// proximo polling normal.
export const pokeAgent = () => {
  const agentUrl = process.env.NEXT_PUBLIC_PYTHON_AGENT_URL;
  if (!agentUrl) return;

  fetch(`${agentUrl}/check_now`, { method: 'POST' }).catch(() => {});
};
