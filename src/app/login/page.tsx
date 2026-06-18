import Image from 'next/image';
import { redirect } from 'next/navigation';
import { AuthForm } from '@/src/features/Auth/container';
import { getCurrentUser } from '@/src/lib/auth';

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) => {
  const currentUser = await getCurrentUser();
  const { next } = await searchParams;
  const nextPath = next?.startsWith('/') && !next.startsWith('//') ? next : '/';

  if (currentUser) redirect(nextPath);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <section className="flex w-full max-w-sm flex-col items-center gap-6">
        <Image
          src="/favicon.jpg"
          alt="Chameleon Wallpaper"
          width={64}
          height={64}
          className="size-16 rounded-md object-cover"
          priority
        />
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Acesse suas pastas, imagens e dispositivos.
          </p>
        </div>
        <AuthForm mode="login" nextPath={nextPath} />
      </section>
    </main>
  );
};

export default LoginPage;
