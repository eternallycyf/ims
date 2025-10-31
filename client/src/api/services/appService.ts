import apiClient from '../apiClient'

/** 此处后端没有提供注释 GET / */
export async function get(options?: { [key: string]: any }) {
  return apiClient.get({ url: '/', ...options })
}
