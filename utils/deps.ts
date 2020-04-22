export default class Deps {
    static testing = false;
    
    private static deps: any[] = [];

    static build(...types: any) {
        if (this.testing) return;
                          
        for (const Type of types) {
            try { this.deps.push(new Type()); }
            // catch { throw new TypeError(`Type '${Type}' could not be instantiated`); }
            catch {}
        }
    }

    static get<T>(type: any): T {
        const service = this.deps.find(t => t instanceof type);
        return service || this.add(new type());
    }

    private static add<T>(instance: T): T {
        this.deps.push(instance);
        return instance;
    }
}
