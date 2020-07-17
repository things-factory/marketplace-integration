export default function route(page) {
  switch (page) {
    case '':
      return '/marketplace-channels'

    case 'marketplace-channels':
      import('./pages/channels')
      return page

    case 'marketplace-channel-lazada':
      import('./pages/channel-lazada')
      return page

    case 'marketplace-channel-shopee':
      import('./pages/channel-shopee')
      return page
  }
}
