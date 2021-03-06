// Need to hide this key
// https://docs.nestjs.com/security/authentication#jwt-functionality
// Do not expose this key publicly. We have done so here to make it clear what the code is doing, but in a production system you must protect this key using appropriate measures such as a secrets vault, environment variable, or configuration service.
export const jwtConstants = {
    secret: process.env.SECRETKEY,
};

export const adminToken = process.env.ADMIN_TOKEN;
