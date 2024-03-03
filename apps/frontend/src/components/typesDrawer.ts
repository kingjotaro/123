import { ReactNode } from 'react';

type DrawerProps = {
  title: string;
  content: ReactNode;
  visible: boolean;
  onClose?: () => void;
};

export default DrawerProps;
