export interface PageSetterProps {
  maxPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
