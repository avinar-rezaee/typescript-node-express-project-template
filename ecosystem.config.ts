module.exports = {
    apps: [{
        name: 'project',
        script: "dist/project/server.js",
        watch: ['./'],
        ignore_watch: ["node_modules", ".git", '*.ts'],
    }]
}