const tableItem = {
    date: "2022-05-20", // 日期
    name: "被删", // 姓名
    phone: "13888888888", // 电话
    address: "重庆市渝北区龙兴镇" // 地址
  };
  // 此处先以 tableItem 为数据源，拷贝生成 20 个数据，然后再根据索引 index 添加上 id
  const tableData = Array(20)
    .fill(tableItem)
    .map((x, i) => {
      return { id: i + 1, ...x };
    });
  export default tableData;