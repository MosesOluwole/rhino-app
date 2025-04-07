import { AppService } from './app.service';
import { Cache } from '@nestjs/cache-manager';
export declare class AppController {
    private readonly appService;
    private cacheManager;
    constructor(appService: AppService, cacheManager: Cache);
    testCache(): Promise<string>;
    getHello(): string;
}
