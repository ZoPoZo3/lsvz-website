const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testDir:'./tests',timeout:45000,workers:1,use:{baseURL:'http://127.0.0.1:5173',channel:'chrome',headless:true,reducedMotion:'reduce'},reporter:[['list'],['html',{open:'never'}]]});
