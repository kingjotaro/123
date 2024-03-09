import { ReactNode, SetStateAction } from 'react';

export type CommonDrawerProps = {
  id?: string;
};

export type ChooseNodeDrawerProps = {
  sourceNodeId: string;
  targetNodeId: string;
  sourceEdgeLabel: ReactNode | null | undefined;
} & CommonDrawerProps;

export default ChooseNodeDrawerProps;

export interface ConditionsProps {
  comparisonType: string;
  setComparisonType: React.Dispatch<SetStateAction<string>>;
  greaterValue: string;
  setGreaterValue: React.Dispatch<SetStateAction<string>>;
  greaterOrEqualValue: string; // Adicionado
  setGreaterOrEqualValue: React.Dispatch<SetStateAction<string>>; // Adicionado
  lowerValue: string;
  setLowerValue: React.Dispatch<SetStateAction<string>>;
  lowerOrEqualValue: string; // Adicionado
  setLowerOrEqualValue: React.Dispatch<SetStateAction<string>>; // Adicionado
  equalValue: string; // Adicionado
  setEqualValue: React.Dispatch<SetStateAction<string>>; // Adicionado
  nameCondition: string;
  setNameCondition: React.Dispatch<SetStateAction<string>>;
}
