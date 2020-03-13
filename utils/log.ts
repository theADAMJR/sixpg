export default class Log {
    static info(message?: string, src?: string) {
        console.log(`[${this.toHHMMSS(new Date())}] ${'INFO'} [${src?.toUpperCase() || 'OTHER'}] ${message}`)
    }
    static error(err?: Error, src?: string) {
        console.error(`[${this.toHHMMSS(new Date())}] ${'ERROR'} [${src?.toUpperCase() || 'OTHER'}] ${err?.message ?? 'Unknown error'}`)
    }

    private static toHHMMSS(time: Date)
    {
        let hours: number | string = time.getHours();
        let minutes: number | string = time.getMinutes();
        let seconds: number | string = time.getSeconds();
    
        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }
        return `${hours}:${minutes}:${seconds}`;
    }
}
