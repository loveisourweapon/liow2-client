/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Google Analytics
declare var ga: (operation: string, key: string, value?: string) => void;

declare module 'alertify.js';
declare module 'in-viewport';
declare module 'to-markdown';
declare module 'showdown';
