import { useMemo, type FC } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../common/Button';
import { useAppLink } from '@/hooks/use-app-link';

type Props = {
  id?: string;
};

export const AppQuickEdit: FC<Props> = ({ id }) => {
  const to = useAppLink(id);

  return (
    <Button className="flex-shrink-0 bg-accent" to={to}>
      <Edit />
    </Button>
  );
};
