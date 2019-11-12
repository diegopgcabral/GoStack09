export const { format: formatCurrencyBR } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const numberOnly = value => {
  return Number(value.replace(/\D/g, ''));
};

export const formatCurrency = value => {
  if (!value) return value;

  value = value.replace(/\./g, ',');
  const index = value.lastIndexOf(',');

  const first = `${value.substr(0, index).replace(/,/g, '')}`;
  const decimal = `${value.substr(index).replace(',', '.')}`;
  const currency = Number(`${first}${decimal}`);

  return currency;
};

export const decimalMask = value => {
  return value.replace(/[^0-9,]/g, '');
};

export const numberMask = value => {
  return value.replace(/[^0-9]/g, '').replace(/^0+/, '');
};

export const moneyMask = value => {
  return value.replace(/[^\d.]+/g, '');
};
