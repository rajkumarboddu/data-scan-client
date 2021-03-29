const getMockDataSource = (noOfRecords = 100) => {
  const dataSource = [];
  for (let i = 0; i < noOfRecords; i++) {
    dataSource.push({
      LAST_REQUISITION_DATE: "2018-11-02",
      VENDOR_NAME: `Masson Inc ${i}`,
      LAST_PO_CREATION_DATE: "2020-01-06",
      OPEN_PO_AMOUNT: 61049.8,
      PAYMENT_AMOUNT: 1071427.79,
      LAST_INVOICE_CREATION_DATE: "2014-11-14",
      OPEN_INVOICE_AMOUNT: 1071427.79,
      LAST_PAYMENT_DATE: "2016-01-31",
      LAST_TRANSACTION_DATE: "2020-01-06",
      RECEIPT_AMOUNT: 6056.2,
      VENDOR_ID: 300000051065858 + i,
      VENDOR_NUM: 1277 + i,
    });
  }
  return dataSource;
};

const mocks = {
  getMockDataSource,
};

export default mocks;
