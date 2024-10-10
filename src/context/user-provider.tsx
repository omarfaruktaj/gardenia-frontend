import { ReactNode, createContext, useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/services/user-service';
import { UserResponse } from '@/types';

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: UserResponse | undefined;
  isLoading: boolean;
  // setUser: (user: UserResponse | null) => void;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: user, isLoading } = useQuery<any, Error, UserResponse>({
    queryKey: ['ME'],
    queryFn: async () => await getCurrentUser(),
  });
  // const [user, setUser] = useState<UserResponse | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  // const handleUser = async () => {
  //   setIsLoading(true);
  //   const user = await getCurrentUser();

  //   setUser(user);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   handleUser();
  // }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }

  return context;
};

export default UserProvider;
