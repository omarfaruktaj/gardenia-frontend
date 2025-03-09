import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import api from '@/config/axios';
import { PaymentData, PostData, UserActivityData } from '@/types';

import { PaymentChart } from './_components/payment-chart';
import { PostChart } from './_components/post-chart';
import { UserActivityChart } from './_components/user-activity-chart';
import { VoteChart } from './_components/vote-chart';

export default async function Page() {
  // const userActivity = await api.get('users/user-activity');
  // const payments = await api.get('payments/monthly-payments');
  // const posts = await api.get('posts/monthly-posts');
  // const votes = await api.get('posts/monthly-votes');

  const userActivity = await api.get('users/user-activity', {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  const payments = await api.get('payments/monthly-payments', {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  const posts = await api.get('posts/monthly-posts', {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  const votes = await api.get('posts/monthly-votes', {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  const userActivityData = userActivity.data.data as UserActivityData[];
  const paymentsData = payments.data.data as PaymentData[];
  const postsData = posts.data.data as PostData[];
  const votesData = votes.data.data;

  console.log(JSON.stringify(paymentsData));
  const totalPosts = postsData.reduce((total, post) => total + post.count, 0);
  const totalPayments = paymentsData.reduce(
    (total, payment) => total + payment.totalAmount,
    0
  );
  const totalUser = userActivityData.reduce(
    (total, user) => total + user.totalUsers,
    0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
            <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="mt-2 text-sm text-muted-foreground">
                Total number of posts created by users.
              </p>
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Payments</CardTitle>
            <p className="text-2xl font-bold text-purple-600">
              ${totalPayments}
            </p>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="mt-2 text-sm text-muted-foreground">
                Total amount of payments processed.
              </p>
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total User</CardTitle>
            <p className="text-2xl font-bold text-orange-600">{totalUser}</p>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="mt-2 text-sm text-muted-foreground">Total user.</p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postsData.length > 0 && (
          <div>
            <PostChart chartData={postsData} />
            <p className="mt-2 text-sm text-muted-foreground">
              Monthly posts created by users.
            </p>
          </div>
        )}
        {votesData.length > 0 && (
          <div>
            <VoteChart chartData={votesData} />
            <p className="mt-2 text-sm text-muted-foreground">
              Monthly voting activity on posts.
            </p>
          </div>
        )}
        {paymentsData.length > 0 && (
          <div>
            <PaymentChart chartData={paymentsData} />
            <p className="mt-2 text-sm text-muted-foreground">
              Total payments processed each month.
            </p>
          </div>
        )}
        {userActivityData.length > 0 && (
          <div>
            <UserActivityChart chartData={userActivityData} />
            <p className="mt-2 text-sm text-muted-foreground">
              User engagement statistics over time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
