/**
 * 获取本地存储中的数据
 * @param {*} name
 */
const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 设置本地存储的数据
 * @param {*} name
 * @param {*} value
 */
const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

/**
 * 删除本地存储中的数据
 * @param {*} name
 */
const removeItem = name => {
  window.localStorage.removeItem(name)
}

export { getItem, setItem, removeItem }
