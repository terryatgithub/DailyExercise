import {wxBase, actiBase} from './base'

export const HomeIntUrl = actiBase + '/light/v2/web/init'
export const HomeDrawUrl = actiBase + '/light/v2/web/start'

export const GET_USER_INFO_URL = actiBase + '/light/v2/web/start'
export const GET_JSSDK_INFO_URL = wxBase + '/cors/accessTokenAPI/getJssdkInfo'
export const GET_WXUSER_INFO_V2_URL = wxBase + '/cors/accessTokenAPI/v2/getWxUserinfo' 
export const GET_WXUSER_INFO_V1_URL = wxBase + '/cors/accessTokenAPI/getWxUserinfo'  //可判断用户是否已关注公众号