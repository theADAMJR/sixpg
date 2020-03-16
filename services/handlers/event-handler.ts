export default interface EventHandler {
    on: string;

    invoke(...args: any[]): Promise<any> | void;
}