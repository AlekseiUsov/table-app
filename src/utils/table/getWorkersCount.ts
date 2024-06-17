// ToDo добавить больше вариантов

export const getWorkersCount = (count: number | undefined) => {
  if (!count) {
    return `В компании нет сотрудников`;
  }
  if (count && count == 1) {
    return `В компании работает ${count} сотрудник`;
  }
  if (count && count > 1 && count < 5) {
    return `В компании работает ${count} сотрудника`;
  }
  if (count && count > 5) {
    return `В компании работает ${count} сотрудников`;
  }
};
