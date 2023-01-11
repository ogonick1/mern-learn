import { useContext } from 'react';
import { DialogManagerContext } from './DialogManagerProvider';

export const useDialog = () => useContext(DialogManagerContext);
