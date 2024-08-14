import { useContext } from 'solid-js';
import { PanelsContext } from '../contexts/panel.context';

export const usePanels = () => useContext(PanelsContext);
