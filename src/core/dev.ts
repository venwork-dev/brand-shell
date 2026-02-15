type ImportMetaEnv = {
  DEV?: boolean;
  MODE?: string;
};

type ImportMetaLike = {
  env?: ImportMetaEnv;
};

export function shouldValidateInDev(): boolean {
  const nodeEnv = typeof process !== "undefined" ? process.env?.NODE_ENV : undefined;
  if (typeof nodeEnv === "string") {
    return nodeEnv !== "production";
  }

  const importMeta = import.meta as unknown as ImportMetaLike;
  if (typeof importMeta.env?.DEV === "boolean") {
    return importMeta.env.DEV;
  }

  return false;
}
