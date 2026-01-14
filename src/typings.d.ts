/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Google Analytics
type GATracker = (operation: string, key: string, value?: string) => void;
interface Window {
  ga?: GATracker;
}
declare var ga: GATracker;

declare module 'alertify.js';
declare module 'in-viewport';
declare module 'to-markdown';
declare module 'showdown';
