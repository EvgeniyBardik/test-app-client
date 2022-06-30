import { Order } from "../types/company-list.types";
export interface Data {
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  type: string;
  description: string;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
}

export interface CompanyRes extends Data {
  id: number;
  userId: number;
}

export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface IEnhancedTable {
  companies: CompanyRes[];
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  order: Order;
  orderBy: string;
}
