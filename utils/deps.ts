export default class Deps {
    private static deps: any[] = [];

    static build(...types: any) {        
        for (const Type of types)
        {
            try { this.deps.push(new Type()); }
            catch { throw new Error(`Type '${Type}' could not be instantiated`); }
        }
    }

    static get<T>(type: any): T {
        const service = this.deps.find(t => t instanceof type);
        return !service ? this.add(new type()) : service;
    }

    private static add<T>(instance: T): T {
        this.deps.push(instance);
        return instance;
    }
}
