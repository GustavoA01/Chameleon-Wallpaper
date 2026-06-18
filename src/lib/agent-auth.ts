import 'server-only';
import { timingSafeEqual } from 'node:crypto';
import { NextRequest } from 'next/server';

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
};

export const isAgentAuthorized = (request: NextRequest) => {
  const expectedToken = process.env.AGENT_TOKEN;
  const authorization = request.headers.get('authorization');
  const receivedToken = authorization?.startsWith('Bearer ')
    ? authorization.slice(7)
    : '';

  if (!expectedToken || !receivedToken) return false;

  return safeEqual(receivedToken, expectedToken);
};
