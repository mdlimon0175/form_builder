const appConfig = Object.freeze({
    app_name: process.env.NEXT_PUBLIC_APP_NAME ?? "Dynamic No-Code Form Builder",
    app_url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    api_url: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
});

export default appConfig;
