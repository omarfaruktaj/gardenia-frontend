'use client';

import {
  BookmarkIcon,
  CameraIcon,
  HomeIcon,
  InfoIcon,
  Layout,
  LogOut,
  MailIcon,
  MoreHorizontal,
  Settings,
  User,
  UserIcon,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUser } from '@/context/user-provider';
import { logout } from '@/services/auth-service';

import Logo from '../logo';
import PostButton from '../post/create-post-button';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    return router.push('/login');
  };

  const mainNavItems = [
    {
      icon: HomeIcon,
      label: 'Home',
      href: '/',
      badge: null,
    },

    {
      icon: BookmarkIcon,
      label: 'Bookmarks',
      href: '/bookmarks',
      badge: null,
    },
    {
      icon: Users,
      label: 'Communities',
      href: '/communities',
      badge: null,
    },
    {
      icon: UserIcon,
      label: 'Profile',
      href: `/${user?._id}`,
      badge: null,
    },
    { icon: CameraIcon, label: 'Gallery', href: '/gallery', badge: null },

    { icon: InfoIcon, label: 'About Us', href: '/about', badge: null },

    { icon: MailIcon, label: 'Contact Us', href: '/contact', badge: null },

    { icon: Settings, label: 'Settings', href: '/settings', badge: null },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="none"
        className=" border-border/40 w-16 xl:w-72 transition-all duration-300 bg-background"
      >
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>

        <SidebarContent className="my-6">
          {/* Search Bar - Only visible on large screens */}
          {/* <SidebarGroup className="hidden xl:block">
            <SidebarGroupContent>
              <div className="px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <SidebarInput
                    placeholder="Search..."
                    className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
                  />
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup> */}

          {/* <SidebarSeparator /> */}

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-y-3">
                {mainNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  const menuButton = (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      size="lg"
                      className="hover:bg-muted/50 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold justify-center xl:justify-start rounded-full px-4"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 relative w-full"
                      >
                        <Icon className="!h-6 !w-6 flex-shrink-0" />
                        <span className="text-lg hidden xl:block">
                          {item.label}
                        </span>
                        {item.badge && (
                          <>
                            {/* Badge for large screens */}
                            <Badge
                              variant="secondary"
                              className="ml-auto h-5 w-5  items-center justify-center p-0 text-xs bg-primary text-primary-foreground hidden xl:flex z-50"
                            >
                              {item.badge}
                            </Badge>
                            {/* Badge for small/medium screens */}
                            <Badge
                              variant="secondary"
                              className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground border-2 border-background rounded-full xl:hidden z-50"
                            >
                              {item.badge > 9 ? '9+' : item.badge}
                            </Badge>
                          </>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  );

                  return (
                    <SidebarMenuItem key={item.label}>
                      {/* Show tooltip only on small/medium screens */}
                      <div className="xl:hidden">
                        <Tooltip>
                          <TooltipTrigger asChild>{menuButton}</TooltipTrigger>
                          <TooltipContent side="right" align="center">
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {/* Show without tooltip on large screens */}
                      <div className="hidden xl:block">{menuButton}</div>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />

          {/* Post Button */}
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-1">
                <PostButton />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile Footer */}
        <SidebarFooter className="py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    {/* Tooltip for small/medium screens */}
                    <div className="xl:hidden">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            size="lg"
                            className="hover:bg-muted/50 data-[state=open]:bg-muted/50 w-12 h-12 p-0 justify-center"
                          >
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarImage
                                src={
                                  user?.avatar ||
                                  '/placeholder.svg?height=40&width=40'
                                }
                                alt={user?.name || 'User'}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user?.name
                                  ? user.name
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')
                                      .toUpperCase()
                                  : 'U'}
                              </AvatarFallback>
                            </Avatar>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>{user?.name || 'User Profile'}</p>
                          <p className="text-xs text-muted-foreground">
                            {user?.username ? `@${user.username}` : user?.email}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {/* Full profile for large screens */}
                    <div className="hidden xl:block">
                      <SidebarMenuButton
                        size="lg"
                        className="hover:bg-muted/50 data-[state=open]:bg-muted/50 "
                      >
                        <Avatar className="h-10 w-10 flex-shrink-0 ">
                          <AvatarImage
                            src={
                              user?.avatar ||
                              '/placeholder.svg?height=40&width=40'
                            }
                            alt={user?.name || 'User'}
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user?.name
                              ? user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-left">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">
                              {user?.name || 'User'}
                            </span>
                            {user?.isVerified && (
                              <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {user?.username ? `@${user.username}` : user?.email}
                          </span>
                        </div>
                        <MoreHorizontal className="ml-auto h-4 w-4" />
                      </SidebarMenuButton>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="w-[240px] mb-2"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${user?._id}`}
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span>View Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <div>
                      <DropdownMenuItem asChild>
                        <Link
                          href={'/admin/dashboard'}
                          className="flex items-center gap-2"
                        >
                          <Layout className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
