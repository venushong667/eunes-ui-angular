import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class EunesWebSocketService {

    private socket: any;
    private socketRef = new Map<string, Observable<any>>();

    constructor() { 
        this.socket = io('', {
            path: '/wss',
            query: {
                "key": "uid"
            }
        });

        if (!this.socket.connected) {
            this.socket.connect();
            this.socket.once('connect', () => {
                console.log('connected')
            });
        };
    }

    subscribe(exchange: string): Observable<any> {
        var queue: any;
        let subscriber = this.socketRef.get(exchange);
        if (subscriber) return subscriber;

        this.socket.emit('subscribe', { exchange: exchange }, (response: any) => {
            queue = response.queue;
        });
        subscriber = new Observable((obs) => {
            this.socket.on(exchange, (data: any) => {
                obs.next(data);
            });
            return () => {
                this.socket.emit('unsubscribe', { exchange: exchange, queue: queue });
                this.socketRef.delete(exchange);
            };
        }).pipe(share());
        this.socketRef.set(exchange, subscriber);
        return subscriber;
    }

    subscribeTopic(exchange: string, topic: string): Observable<any> {
        var queue: any;
        const key = `${exchange}-${topic}`;
        let subscriber = this.socketRef.get(key);
        if (subscriber) return subscriber;

        this.socket.emit('subscribe-topic', { exchange: exchange, topic: topic, listen: key }, (response: any) => {
            queue = response.queue;
        });
        subscriber = new Observable((obs) => {
            this.socket.on(key, (data: any) => {
                obs.next(data);
            });
            return () => {
                this.socket.emit('unsubscribe', { exchange: exchange, queue: queue });
                this.socketRef.delete(key);
            };
        }).pipe(share());
        this.socketRef.set(key, subscriber);
        return subscriber;
    }

    publish(exchange: string, topic: string, content: any) {
        this.socket.emit('publish', { exchange: exchange, topic: topic, content: content });
        return;
    }
}
