const delay = async (ms = 320) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

export const performRegister = async () => {
  await delay();
  return {
    status: "ok" as const,
  };
};
