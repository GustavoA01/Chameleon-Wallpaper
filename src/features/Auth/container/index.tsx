'use client';
import { useActionState } from 'react';
import { AuthState, login, register } from '@/src/actions/auth';
import { AuthFormProps } from '../types';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

const initialState: AuthState = {};

export const AuthForm = ({ mode, nextPath }: AuthFormProps) => {
  const isRegister = mode === 'register';
  const action = isRegister ? register : login;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const alternateRoute = isRegister ? 'login' : 'register';
  const alternateHref = `/${alternateRoute}?next=${encodeURIComponent(nextPath)}`;

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <input name="next" type="hidden" value={nextPath} />

      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          minLength={8}
          required
        />
      </div>

      {isRegister && (
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
      )}

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Aguarde...' : isRegister ? 'Criar conta' : 'Entrar'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isRegister ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}{' '}
        <Link
          className="font-medium text-primary hover:underline"
          href={alternateHref}
        >
          {isRegister ? 'Entrar' : 'Criar conta'}
        </Link>
      </p>
    </form>
  );
};
