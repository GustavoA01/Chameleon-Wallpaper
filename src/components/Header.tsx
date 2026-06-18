import Image from 'next/image';
import { LogIn, LogOut } from 'lucide-react';
import { logout } from '@/src/actions/auth';
import { getCurrentUser } from '@/src/lib/auth';
import { Button } from './ui/button';
import Link from 'next/link';

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="bg-primary">
      <div className="container mx-auto flex items-center gap-3 px-4 py-4">
        <Image
          priority
          width={28}
          height={28}
          src="/favicon.jpg"
          alt="Chameleon Wallpaper"
          className="size-7 rounded-sm object-cover"
        />
        <h1 className="min-w-0 flex-1 truncate text-lg font-montserrat font-bold select-none">
          Chameleon Wallpaper
        </h1>

        {!user ? (
          <Button variant="outline">
            <Link href="/login">Entrar</Link>
            <LogIn />
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="hidden max-w-64 truncate text-sm sm:inline">
              {user.email}
            </span>
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                title="Sair"
                aria-label="Sair"
              >
                <LogOut />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
