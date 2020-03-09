import Module from "./module";

export class GeneralModule extends Module {
    prefix = '/';
    ignoredChannels: string[] = [];
}