export default interface EventHandler {
    invoke(...args: any[]): Promise<any> | void;
}