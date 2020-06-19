import cookie from 'js-cookie'

// set in cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        console.log('window is defined')
        cookie.set(key, value, { expires: 1 })
    }
}
// remove from cookie
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        console.log('window is defined')
        cookie.remove(key, { expires: 1 })
    }
}
// get from cookie such as stored token
export const getCookie = (key) => {
    if(window !== 'undefined') {
        console.log('window is defined')
        return cookie.get(key)
    }
}

// set in localstorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        console.log('window is defined')
        localStorage.setItem(key, JSON.stringify(value))
    }
}
// remove from localstorage
export const removeLocalStorage = (key) => {
    if(window !== 'undefined') {
        console.log('window is defined')
        localStorage.removeItem(key)
    }
}
 
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

// access userinfo from localstorage
export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else return false
        }
    }
}

//signout 
export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}