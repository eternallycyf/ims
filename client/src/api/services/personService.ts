import apiClient from '../apiClient'

/** 此处后端没有提供注释 GET /api/person */
export async function getPerson(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPersonParams,
  options?: { [key: string]: any },
) {
  return apiClient.get({ url: '/api/person', params, ...options })
}

/** 此处后端没有提供注释 POST /api/person */
export async function postPerson(
  body: API.CreatePersonDto,
  options?: { [key: string]: any },
) {
  return apiClient.post({ url: '/api/person', data: body, ...options })
}

/** 此处后端没有提供注释 GET /api/person/${param0} */
export async function getPersonId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPersonIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return apiClient.get({ url: `/api/person/${param0}`, params, ...options })
}

/** 此处后端没有提供注释 DELETE /api/person/${param0} */
export async function deletePersonId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePersonIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return apiClient.delete({ url: `/api/person/${param0}`, params, ...options })
}

/** 此处后端没有提供注释 PATCH /api/person/${param0} */
export async function patchPersonId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.patchPersonIdParams,
  body: API.UpdatePersonDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return apiClient.patch({ url: `/api/person/${param0}`, params, data: body, ...options })
}

/** 此处后端没有提供注释 POST /api/person/file */
export async function postPersonFile(
  body: API.CreatePersonDto,
  options?: { [key: string]: any },
) {
  return apiClient.post({ url: '/api/person/file', data: body, ...options })
}
