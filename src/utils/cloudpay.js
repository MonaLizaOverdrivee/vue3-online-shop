export function pay(totalProductsPrice) {
  // eslint-disable-next-line
  const widget =  new cp.CloudPayments()
  return new Promise((resolve, reject) => {
    widget.pay(
      "charge", // или 'auth'
      {
        //options
        publicId: "test_api_00000000000000000000001", //id из личного кабинета
        description: "Оплата товаров в onlineshop.com", //назначение
        amount: totalProductsPrice, //сумма
        currency: "RUB", //валюта
        invoiceId: "1234567", //номер заказа  (необязательно)
        accountId: "user@example.com", //идентификатор плательщика (необязательно)
        skin: "classic", //дизайн виджета (необязательно)
        data: {
          myProp: "myProp value"
        }
      },
      {
        onSuccess: () => resolve(),
        onFail: () => reject()
      }
    );
  });
}
