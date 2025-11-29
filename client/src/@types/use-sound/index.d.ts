declare module 'use-sound' {
    type PlayOptions = { id?: string } & Record<string, unknown>;
    type PlayFunction = (options?: PlayOptions) => void;

    function useSound(
        src: string,
        options?: Record<string, unknown>
    ): [PlayFunction, { sound?: unknown }];

    export default useSound;
}
