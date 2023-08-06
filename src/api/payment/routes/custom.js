module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/update',
            handler: '24karat.updateAction',
            config: {
                auth: false,
            }
        }
    ]
}