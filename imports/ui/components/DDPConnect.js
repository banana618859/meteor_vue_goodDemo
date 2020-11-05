/*
 * @Description: 
 * @Author: zhifeng.zhang
 * @Date: 2019-12-26 09:13:50
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-05 09:51:22
 */
import { DDP } from 'meteor/ddp-client'
export class DDPConnect
{
  constructor(url, eventHandle)
  {
    this.url = url
    this.connectObj = null
    this.callbacks = []
    this.stop = false
    this.addEventHandle(eventHandle)
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.connectObj = DDP.connect(this.url, { retry: true });
      this.stop = false
      Tracker.autorun((computation) => {
        let status = this.connectObj.status().status
        if (status === "connected") {
          console.log('connect connected');
          this.publishEvent('changestatus', 'success')
          resolve(true)
        } else if (status === "connecting") {
          this.publishEvent('changestatus', 'connecting')
        } else {
          console.log('---connect failed!---');
          this.publishEvent('changestatus', 'failed')
          resolve(false)
        }

        if (this.stop) {
          computation.stop()
        }
      })
    })
  }

  getConnectObj () {
    return this.connectObj
  }
  
  status() {
    if (this.connectObj === null || this.connectObj === undefined) {
      console.warn('DDPConnect must be call connect before')
      return
    }
    return this.connectObj.status()
  }

  reconnect () {
    return new Promise((resolve, reject) => {
      if (this.connectObj === null || this.connectObj === undefined) {
        console.warn('DDPConnect must be call connect before')
        resolve()
      }
      this.connectObj.reconnect()
      Tracker.autorun((computation) => {
        let status = this.connectObj.status().status
        if (status === "connected") {
          console.log('connect connected');
          computation.stop()
          resolve()
        } else if (status === "connecting") {
        }  else {
          console.log('---connect failed!---');
          computation.stop()
          resolve()
        }
      })
    })
  }

  disconnect () {
    if (this.connectObj === null || this.connectObj === undefined) {
      console.warn('DDPConnect must be call connect before')
      return
    }
    this.stop = true
    this.connectObj.disconnect()
    this.publishEvent('changestatus', 'offline')
  }

  getUrl () {
    return this.url
  }

  setUrl (url) {
    console.log('setUrl:', url)
    return new Promise(async (resolve, reject) => {
      if (this.connectObj === null || this.connectObj === undefined) {
        console.warn('DDPConnect must be call connect before')
        resolve(false)
      }
      if (this.url !== url) {
        this.connectObj.disconnect()
        this.url = url
        this.publishEvent('changeurl', url)
        let res = await this.connect()
        resolve(res)
      }
      resolve(true)
    })
  }

  call () {
    if (this.connectObj === null || this.connectObj === undefined) {
      console.warn('DDPConnect must be call connect before')
      return null
    }
    return this.connectObj.call(...arguments)
  }

  subscribe () {
    if (this.connectObj === null || this.connectObj === undefined) {
      console.warn('DDPConnect must be call connect before')
      return
    }
    return this.connectObj.subscribe(...arguments)
  }

  addEventHandle (eventHandle) {
    if (eventHandle) {
      if (this.callbacks.indexOf(eventHandle) === -1) {
        this.callbacks.push(eventHandle)
      }
    }
    // console.log('addEventHandle', this.callbacks, eventHandle)
  }

  removeEventHandle (eventHandle) {
    if (eventHandle) {
      let indexFind = this.callbacks.indexOf(eventHandle)
      if (indexFind !== -1) {
        this.callbacks.splice(indexFind, 1)
      }
    }
    // console.log('removeEventHandle', this.callbacks, eventHandle)
  }

  publishEvent (type, event) {
    // console.log('publishEvent:', this.callbacks, type, event)
    if (this.callbacks) {
      this.callbacks.forEach(cb => {
        try {
          cb && cb(this, type, event)
        } catch (error) {
          console.error(error)
        }
      });
    }

  }
}