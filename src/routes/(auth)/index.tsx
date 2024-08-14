import { Title } from '@solidjs/meta';
import { Typography } from '~/app/components/typographies';
import { useAuth } from '~/auth/models/hooks/use-auth';

export default function Home() {
  const [state] = useAuth();
  return (
    <div>
      <Title>Home</Title>
      <Typography variant="h1">Hello {state.user?.firstName}</Typography>
    </div>
  );
}
