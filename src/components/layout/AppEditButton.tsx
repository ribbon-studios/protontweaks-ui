import { type FC } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../common/Button';

type Props = {
  id?: string;
};

export const AppQuickEdit: FC<Props> = ({ id }) => {
  return (
    <Button
      className="flex-shrink-0 bg-accent"
      to={
        id
          ? `https://github.com/ribbon-studios/protontweaks-db/edit/main/apps/${id}.json`
          : 'https://github.com/ribbon-studios/protontweaks-db/tree/main/apps'
      }
    >
      <Edit />
    </Button>
  );
};
