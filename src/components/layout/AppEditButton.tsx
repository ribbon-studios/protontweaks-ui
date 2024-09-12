import { useState, type FC } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../common/Button';
import { AppModal } from '../app/AppModal';

type Props = {
  id?: string;
};

export const AppQuickEdit: FC<Props> = ({ id }) => {
  const [isOpen, setOpen] = useState(false);

  if (id) {
    return (
      <Button
        className="flex-shrink-0 bg-accent"
        to={`https://github.com/ribbon-studios/protontweaks-db/edit/main/apps/${id}.json`}
      >
        <Edit />
      </Button>
    );
  }

  return (
    <>
      <Button className="flex-shrink-0 bg-accent" onClick={() => setOpen(true)}>
        <Edit />
      </Button>
      <AppModal isOpen={isOpen} onOpenChanged={(updatedIsOpen) => setOpen(updatedIsOpen)} />
    </>
  );
};
