import path from "path";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";
import { GeneratorOptions } from "../../base-generator/types";
import { GeneratorOptions as PreactGeneratorOptions } from "../../preact-generator";
import { executeInBuildFolder } from "./common";

export declare type Options = { platform: string; tsConfig?: string } & (
  | GeneratorOptions
  | PreactGeneratorOptions
);

const loaderExt = executeInBuildFolder(__dirname) ? "js" : "ts";

export default (
  fileName: string,
  options: Options = { platform: "custom" }
) => {
  const compiler = webpack({
    context: __dirname,
    entry: path.resolve(fileName),
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: {
            loader: path.resolve(
              __dirname,
              `../../webpack-loader.${loaderExt}`
            ),
            options: options,
          },
        },
      ],
    },
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume()) as any;
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise<webpack.Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors())
        reject(new Error(stats.toJson().errors.join("\n")));

      resolve(stats);
    });
  });
};
