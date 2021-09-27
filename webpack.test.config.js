const path = require("path")

module.exports = {
    mode: "development",
    node: {
        global: false
    },
    entry: "./dist-test/index",
    output: {
        path: path.resolve(__dirname, "lib-web"),
        filename: "nmshd.content.test.js",
        library: "NMSHDContentTest",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            src: path.resolve(__dirname, "tmp-browser/src/")
        }
    },
    devtool: "source-map",
    externals: {
        chai: "chai",
        lokijs: "loki",
        agentkeepalive: "NMSHD",
        process: "NMSHD",
        path: "NMSHD",
        assert: "NMSHD",
        util: "NMSHD",
        "fs-extra": "NMSHD",
        fs: "NMSHD",
        "graceful-fs": "NMSHD",
        "@js-soft/node-logger": "NMSHDNodeLogger",
        "@nmshd/transport": "NMSHDTransport",
        "@nmshd/content": "NMSHDContent",
        "@nmshd/crypto": "NMSHDCrypto",
        "@js-soft/ts-serval": "NMSHDTsServal"
    }
}
