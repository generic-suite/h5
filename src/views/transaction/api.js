import request from '@/utils/axios';
const data = [
  {
    id: 214737,
    type: 5,
    description: '',
    created_at: '2023-10-04T15:22:55.000000Z',
    amount: '6.25',
  },
  {
    id: 214736,
    type: 4,
    description: '',
    created_at: '2023-10-04T15:22:55.000000Z',
    amount: '1250.00',
  },
  {
    id: 214735,
    type: 3,
    description: 'Samsung Galaxy Tablet A8',
    created_at: '2023-10-04T15:22:55.000000Z',
    amount: '-1250.00',
  },
  {
    id: 212945,
    type: 5,
    description: '',
    created_at: '2023-10-04T12:02:42.000000Z',
    amount: '6.75',
  },
  {
    id: 212944,
    type: 4,
    description: '',
    created_at: '2023-10-04T12:02:42.000000Z',
    amount: '1349.00',
  },
  {
    id: 212943,
    type: 3,
    description: 'Brand New Dell Latitude 5530 Laptop 15"/ FHD / i5 / 256-SSD / 16GB',
    created_at: '2023-10-04T12:02:42.000000Z',
    amount: '-1349.00',
  },
  {
    id: 212178,
    type: 5,
    description: '',
    created_at: '2023-10-04T10:02:03.000000Z',
    amount: '3.00',
  },
  {
    id: 212177,
    type: 4,
    description: '',
    created_at: '2023-10-04T10:02:03.000000Z',
    amount: '599.96',
  },
  {
    id: 212176,
    type: 3,
    description: "Nike Air Force 1 Low '07 White on White  Men's Sneakers",
    created_at: '2023-10-04T10:02:03.000000Z',
    amount: '-599.96',
  },
  {
    id: 45203,
    type: 5,
    description: '',
    created_at: '2023-08-15T11:59:48.000000Z',
    amount: '2.85',
  },
  {
    id: 45202,
    type: 4,
    description: '',
    created_at: '2023-08-15T11:59:48.000000Z',
    amount: '570.00',
  },
  {
    id: 45201,
    type: 3,
    description: '[C] Apple iPAD Mini 1st Gen Tablet 16GB  IPS WiFi AU STOCK Unlocked  A GRADE ',
    created_at: '2023-08-15T11:59:48.000000Z',
    amount: '-570.00',
  },
  {
    id: 45200,
    type: 5,
    description: '',
    created_at: '2023-08-15T11:59:29.000000Z',
    amount: '2.28',
  },
  {
    id: 45199,
    type: 4,
    description: '',
    created_at: '2023-08-15T11:59:29.000000Z',
    amount: '455.00',
  },
  {
    id: 45198,
    type: 3,
    description: 'HP ProDesk 600 G5 (256GB, Intel Core i5 9500 8GB) SFF Desktop - 7wk35pa',
    created_at: '2023-08-15T11:59:29.000000Z',
    amount: '-455.00',
  },
  {
    id: 45197,
    type: 1,
    description: '',
    created_at: '2023-08-15T11:58:08.000000Z',
    amount: '1000.00',
  },
  {
    id: 45189,
    type: 12,
    description: '',
    created_at: '2023-08-15T11:42:21.000000Z',
    amount: '20.00',
  },
];

export const getList = (data) => {
  return request({
    url: '/getWalletList',
    method: 'POST',
    data,
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data,
        success: true,
        message: 'success',
      });
    }, 200);
  });
};
