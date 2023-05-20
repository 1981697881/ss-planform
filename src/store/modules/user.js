import {login, getInfo, getAuth, changePassword, getPermissions} from '@/api/user'
import {getToken, setToken, removeToken, setUserName, setPassword, setPer} from '@/utils/auth'
import {resetRouter} from '@/router'
import Cookies from 'js-cookie'

const state = {
  token: getToken('ssrx'),
  name: '',
  url: 'http://bli.gzfzdev.com:50060',
  avatar: '',
  plper: '',
  username: '',
  password: '',
  userInfo: Cookies.get('userInfo') ? Cookies.get('userInfo') : {},
}
const mutations = {
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PER: (state, plper) => {
    state.plper = plper
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
}

const actions = {
  setUserInfo({commit}, data) {
    commit('SET_USER_INFO', data)
    Cookies.set('userInfo', data)
  },
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    userInfo.username = username.trim()
    return new Promise((resolve, reject) => {
      getAuth({"auth": "NW202301XY"}).then(authRes => {
        if (authRes.success) {
          userInfo.FTargetKey = authRes.data.FTargetKey
          userInfo.FAppKey = authRes.data.FAppKey
          userInfo.FSecret = authRes.data.FSecret
          userInfo.FK3CloudUrl = authRes.data.FK3CloudUrl
          login(userInfo).then(response => {
            const {data} = response
            /* commit('SET_TOKEN', data.fid)
             setToken(data.fid)*/
            commit('SET_USERNAME', username)
            commit('SET_PASSWORD', password)
            commit('SET_USER_INFO', authRes.data)
            Cookies.set('userInfo', authRes.data)
            setUserName(username)
            setPassword(password)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }
      }).catch(error => {
        reject(error)
      })

    })
  },
  //修改密码
  changePassword({commit}, info) {
    return new Promise((resolve, reject) => {
      changePassword(info).then(response => {
        commit('SET_TOKEN', '')
        //removeToken('plper')
        removeToken('ssrx')
        removeToken('sspx')
        removeToken('ssun')
        resetRouter()
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {name, avatar} = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getPermissions({commit, state}) {
    return new Promise((resolve, reject) => {
      getPermissions(state.token).then(response => {
        const {data} = response

        if (!data) {
          reject('Verification failed, please Login again.')
        } else {
          if (data.length <= 0) {
            setPer('')
            commit('SET_TOKEN', '')
            resolve(data)
          } else {
            const {plper} = data
            // 转unicode
            let res = []
            let str = data[0]['permissionName']
            for (let i = 0; i < str.length; i++) {
              res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4)
            }
            let cot = "\\u" + res.join("\\u")
            setPer(cot)
            //commit('SET_TOKEN', plper)
            resolve(data)
          }
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      //logout({ fid: state.token }).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_PER', '')
      commit('SET_USER_INFO', {})
      //removeToken('plper')
      removeToken('ssrx')
      removeToken('sspx')
      removeToken('ssun')
      removeToken('userInfo')
      resetRouter()
      resolve()
      /*}).catch(error => {
        reject(error)
      })*/

      /* commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      localStorage.removeItem('routes')
      router */
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken('ssrx')
      /*  removeToken('sspx')
        removeToken('ssun')*/
      removeToken()
      resolve()
    })
  },
  // add token
  addToken({commit}, state) {
    return new Promise(resolve => {
      commit('SET_TOKEN', state)
      setToken(state)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

