import { ReactNode } from 'react';

export type CommonDrawerProps = {
  id?: string;
};

export type ChooseNodeDrawerProps = {
  sourceNodeId: string;
  targetNodeId: string;
  sourceEdgeLabel: ReactNode | null | undefined;
} & CommonDrawerProps;

export default ChooseNodeDrawerProps;
