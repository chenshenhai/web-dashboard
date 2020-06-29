export const menuConfig = [
  {
    name: '编码处理',
    iconClassName: 'webdashboard-icon-code',
    children: [
      {
        name: 'Unicode 转码',
        page: 'unicode',
      },
      {
        name: 'Ascii 转码',
        page: 'ascii',
      },
      {
        name: 'URI 转码',
        page: 'uri',
      },
      {
        name: '二维码',
        page: 'qrcode',
      }
    ]
  },
  {
    name: '图像处理',
    iconClassName: 'webdashboard-icon-image',
    children: [
      {
        name: '基本处理',
        page: '',
      },
    ]
  }

]