import type { TagType } from '@/pages/dashboard/monitor/data';

const delay = async (ms = 240) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

export const fetchMonitorTags = async () => {
  await delay();
  const list: TagType[] = Array.from({ length: 100 }).map((_, index) => ({
    name: `城市${index + 1}`,
    value: 30 + ((index * 13) % 150),
    type: `${index % 3}`,
  }));

  return { list };
};
