import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'marketplace-channels',
      page: 'marketplace-channels'
    },
    {
      tagname: 'marketplace-channel-lazada',
      page: 'marketplace-channel-lazada'
    }
  ],
  bootstrap
}
