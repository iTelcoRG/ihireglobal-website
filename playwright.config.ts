import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:false,workers:1,reporter:'list',use:{baseURL:'http://127.0.0.1:4321',channel:'chrome',headless:true},webServer:{command:'npm.cmd run preview -- --port 4321',url:'http://127.0.0.1:4321',reuseExistingServer:true,timeout:30000}});
