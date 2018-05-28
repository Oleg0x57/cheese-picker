import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const products = [
            { id: 1, title: 'cheese', price: 34 },
            { id: 2, title: 'milk', price: 44 },
            { id: 3, title: 'another cheese', price: 54 }];
        return {products};
    }
}