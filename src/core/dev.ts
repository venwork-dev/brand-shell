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

  const { env } = import.meta as unknown as ImportMetaLike;
  if (typeof env?.DEV === "boolean") {
    return env.DEV;
  }

  return false;
}
