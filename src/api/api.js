import request from './request'

export const getBannerRequest = () => {
  return request.get('/banner')
}

export const getRecommendListRequest = () => {
  return request.get('/personalized')
}

export const getHotSingerListRequest = count => {
  return request.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (category, alpha, count) => {
  return request.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}

export const getRankListRequest = () => {
  return request.get(`/toplist/detail`)
}

export const getAlbumDetailRequest = id => {
  return request.get(`/playlist/detail?id=${id}`)
}

export const getSingerInfoRequest = id => {
  return request.get(`/artists?id=${id}`)
}

export const getHotKeyWordsRequest = () => {
  return request.get(`/search/hot`)
}

export const getSuggestListRequest = query => {
  return request.get(`/search/suggest?keywords=${query}`)
}

export const getResultSongsListRequest = query => {
  return request.get(`/search?keywords=${query}`)
}

export const getSongDetailRequest = id => {
  return request.get(`/song/detail?ids=${id}`)
}

export const getLyricRequest = id => {
  return request.get(`/lyric?id=${id}`)
}

export const loginByPhoneRequest = (phone, password) => {
  return request.get(`/login/cellphone?phone=${phone}&password=${password}`)
}

export const sentVcodeRequest = phone => {
  return request.get(`/captcha/sent?phone=${phone}`)
}

export const loginByVcodeRequest = (phone, vcode) => {
  return request.get(`/captcha/verify?phone=${phone}&captcha=${vcode}`)
}
