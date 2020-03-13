export default class Deps {
    private static deps: any[] = [];

    static build(...types: any) {
        for (const Type of types) {
            this.deps.push(new Type());
        }
    }

    static get<T>(type: any): T {
        const service = this.deps.find(t => t instanceof type);

        if (!service) {
            throw new Error(`Service of type '${type?.name}' could not be found.`);
        }
        return service;
    }
}
