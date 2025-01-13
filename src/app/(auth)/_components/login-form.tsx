// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { ErrorCard } from '@/components/ui/error-card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/ui/loading-button';
import { PasswordInput } from '@/components/ui/password-input';
import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
import { login } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';
// import { useState, useTransition } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';
// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });
//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);
//     startTransition(async () => {
//       const { data, error } = await login(values);
//       if (error) {
//         form.reset();
//         setError(error);
//       }
//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />
//         <ErrorCard message={error} />
//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// 'use client';

// import { useState, useTransition } from 'react';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';

// import { Button } from '@/components/ui/button';
// import { ErrorCard } from '@/components/ui/error-card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import LoadingButton from '@/components/ui/loading-button';
// import { PasswordInput } from '@/components/ui/password-input';
// import { TLoginSchema, loginSchema } from '@/schemas/auth-schema';
// import { login } from '@/services/auth-service';
// import { getCurrentUser } from '@/services/user-service';

// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>(undefined);
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const form = useForm<TLoginSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   function onSubmit(values: TLoginSchema) {
//     setError(undefined);

//     startTransition(async () => {
//       const { data, error } = await login(values);

//       if (error) {
//         form.reset();
//         setError(error);
//       }

//       if (data) {
//         queryClient.invalidateQueries({ queryKey: ['ME'] });
//         await getCurrentUser();
//         router.push('/');
//       }
//     });
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="Enter your email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <PasswordInput {...field} />
//               </FormControl>
//               <FormMessage />
//               <Link
//                 href="/forgot-password"
//                 className="ml-auto inline-block pt-2 text-sm underline"
//               >
//                 Forgot your password?
//               </Link>
//             </FormItem>
//           )}
//         />

//         <ErrorCard message={error} />

//         <LoadingButton loading={isPending} type="submit" className="w-full">
//           {isPending ? 'Logging in...' : 'Login'}
//         </LoadingButton>
//         <div className="mt-4 text-center text-sm text-muted-foreground">
//           Don’t have an account?{' '}
//           <Button variant={'link'} asChild className="pl-1">
//             <Link href="/signup"> Sign up here</Link>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: TLoginSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await login(values);

      if (error) {
        form.reset();
        setError(error);
      }

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        await getCurrentUser();
        router.push('/');
      }
    });
  }

  function handleDemoLogin(userType: 'demo' | 'admin') {
    const demoCredentials = {
      demo: { email: 'user@gmail.com', password: 'user123' },
      admin: { email: 'admin@gmail.com', password: 'admin123' },
    };

    const credentials = demoCredentials[userType];

    form.setValue('email', credentials.email);
    form.setValue('password', credentials.password);

    onSubmit({ email: credentials.email, password: credentials.password });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
              <Link
                href="/forgot-password"
                className="ml-auto inline-block pt-2 text-sm underline"
              >
                Forgot your password?
              </Link>
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? 'Logging in...' : 'Login'}
        </LoadingButton>

        <div className="mt-2 flex justify-center space-x-4 w-full">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => handleDemoLogin('demo')}
          >
            Demo Login
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => handleDemoLogin('admin')}
          >
            Admin Login
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{' '}
          <Button variant={'link'} asChild className="pl-1">
            <Link href="/signup"> Sign up here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
