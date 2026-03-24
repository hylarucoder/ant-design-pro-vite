const delay = async (ms = 320) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

export const submitDemoForm = async <T>(values: T) => {
  await delay();
  return values;
};
