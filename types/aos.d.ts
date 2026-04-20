declare module "aos" {
  interface AOSInitOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
    delay?: number;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  interface AOSModule {
    init(options?: AOSInitOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AOSModule;
  export default AOS;
}
