module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@localization": "./localization",
            "@hooks": "./hooks",
            "@services": "./services",
            "@components": "./components",
            "@screens": "./screens",
            "@assets": "./assets",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
