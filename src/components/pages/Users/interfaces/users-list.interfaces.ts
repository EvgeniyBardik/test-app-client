import { Order } from "../types/users-list.types";
export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  nickName: string;
  description: string;
  position: string;
  firstName: string;
  lastName: string;
}

export interface HeadCell {
  id: keyof User;
  label: string;
}

export interface UserRes extends User {
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
  users: User[];
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  order: Order;
  orderBy: string;
}
