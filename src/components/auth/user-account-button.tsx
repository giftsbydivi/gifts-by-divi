'use client';

import { useState } from 'react';

import Link from 'next/link';

import { User, LogOut, ChevronDown } from 'lucide-react';

import { useAuth } from '@/lib/providers/auth-provider';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserAccountButtonProps {
  onLoginClick?: () => void;
}

export function UserAccountButton({ onLoginClick }: UserAccountButtonProps) {
  const { user, isAuthenticated, openLoginModal, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    openLoginModal();
    if (onLoginClick) onLoginClick();
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-neutral-900 hover:text-rose-700"
        onClick={handleLoginClick}
      >
        <User className="mr-2 h-4 w-4" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-sm text-neutral-900 hover:text-rose-700"
        >
          <User className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline-block">{user?.name?.split(' ')[0]}</span>
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="truncate text-xs text-neutral-500">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer">
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="cursor-pointer">
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
