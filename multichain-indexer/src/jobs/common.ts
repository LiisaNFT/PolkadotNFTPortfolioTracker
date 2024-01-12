import config from '../Enjin/config'

export const redisConfig = {
    port: config.redisPort,
    host: config.redisHost,
    db: config.redisDb,
    tls: config.redisSupportsTls ? {} : undefined,
}
