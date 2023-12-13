import config from '../src/enjin/src/config'

export const redisConfig = {
    port: config.redisPort,
    host: config.redisHost,
    db: config.redisDb,
    tls: config.redisSupportsTls ? {} : undefined,
}
