interface ConfigInterface {
    consts: {
        url: string,
        server: {
            host: string,
            port: number
        },
        serviceProviderServer: {
            url: string
        }
    }
}

const config: ConfigInterface = {
    consts: {
        url: '',
        server: {
            host: '127.0.0.1',
            port: 80
        },
        serviceProviderServer: { url: "https://my-hono-app-bun.avinar-rezaee.workers.dev" }
    }
}
export default config;