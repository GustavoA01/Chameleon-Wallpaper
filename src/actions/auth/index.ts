'use server';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import {
  clearSession,
  createSession,
  hashPassword,
  verifyPassword,
} from '@/src/lib/auth';

export type AuthState = {
  error?: string;
};

const normalizeEmail = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .trim()
    .toLowerCase();

const getPassword = (value: FormDataEntryValue | null) => String(value ?? '');

const getNextPath = (value: FormDataEntryValue | null) => {
  const path = String(value ?? '');
  return path.startsWith('/') && !path.startsWith('//') ? path : '/';
};

export const register = async (
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const email = normalizeEmail(formData.get('email'));
  const password = getPassword(formData.get('password'));
  const confirmPassword = getPassword(formData.get('confirmPassword'));

  if (!email.includes('@')) return { error: 'Informe um e-mail válido.' };
  if (password.length < 8)
    return { error: 'A senha precisa ter pelo menos 8 caracteres.' };

  if (password !== confirmPassword)
    return { error: 'As senhas não coincidem.' };

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: 'Este e-mail já está cadastrado.' };

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPassword(password),
    },
  });

  await createSession(user.id);
  redirect(getNextPath(formData.get('next')));
};

export const login = async (
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const email = normalizeEmail(formData.get('email'));
  const password = getPassword(formData.get('password'));
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: 'E-mail ou senha inválidos' };
  }

  await createSession(user.id);
  redirect(getNextPath(formData.get('next')));
};

export const logout = async () => {
  await clearSession();
  redirect('/login');
};
