import NewsModel from '../../../api/models/NewsModel';

interface HeadCell {
  disablePadding: boolean;
  id: keyof NewsModel;
  label: string;
  align: 'left' | 'right' | 'center';
}

export const headCells: HeadCell[] = [
  {
    id: 'image',
    align: 'left',
    disablePadding: true,
    label: 'Image',
  },
  { id: 'source', align: 'left', disablePadding: false, label: 'Source' },
  { id: 'author', align: 'left', disablePadding: false, label: 'Author' },
  { id: 'title', align: 'left', disablePadding: false, label: 'Title' },
  { id: 'date', align: 'left', disablePadding: false, label: 'Date' },
  { id: 'url', align: 'right', disablePadding: false, label: 'URL' },
];
