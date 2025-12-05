/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ENABLE_MOCK?: string;
  readonly VITE_APP_URL?: string;
  readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend NodeJS namespace for process.env usage
declare namespace NodeJS {
    interface ProcessEnv {
        API_KEY: string;
        [key: string]: string | undefined;
    }
}

// Module declarations
declare module 'react-router-dom';

declare module 'nprogress' {
    interface NProgress {
        start: () => NProgress;
        done: (force?: boolean) => NProgress;
        set: (n: number) => NProgress;
        inc: (amount?: number) => NProgress;
        configure: (options: NProgressOptions) => NProgress;
        status: number | null;
        isStarted: () => boolean;
        remove: () => void;
    }

    interface NProgressOptions {
        minimum?: number;
        template?: string;
        easing?: string;
        speed?: number;
        trickle?: boolean;
        trickleSpeed?: number;
        showSpinner?: boolean;
        parent?: string;
        positionUsing?: string;
        barSelector?: string;
        spinnerSelector?: string;
    }

    const nprogress: NProgress;
    export default nprogress;
}

declare namespace google {
    namespace maps {
        class Map {
            constructor(mapDiv: Element | null, opts?: any);
            setCenter(center: any): void;
            setZoom(zoom: number): void;
            addListener(eventName: string, handler: (e: any) => void): void;
        }
        class Marker {
            constructor(opts?: any);
            setMap(map: Map | null): void;
        }
        interface MapMouseEvent {
            latLng: {
                lat: () => number;
                lng: () => number;
            };
        }
    }
}