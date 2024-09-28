export class EventEmitter {
    events: Record<string, Function[]> = {};

    on(event: string, cb: Function) {
        if (!this.events[event]) this.events[event] = [];

        this.events[event].push(cb);
        return () => {
            this.events[event] = this.events[event].filter(item => item !== cb);
        };
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.events[event]) return;

        this.events[event].forEach(fn => fn(...args));
    }
}
