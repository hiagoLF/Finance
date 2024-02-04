const formater = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const convertToBrlMoney = (money: string) => {
  const moneyNumbers = money.match(/\d/g)?.join('');
  const numbers = Number(moneyNumbers);

  return formater.format(numbers / 100);
};
