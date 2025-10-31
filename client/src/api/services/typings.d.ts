declare namespace API {
  interface CreatePersonDto {}

  interface deletePersonIdParams {
    id: string
  }

  interface getPersonIdParams {
    id: number
  }

  interface getPersonParams {
    name: string
    age: string
  }

  interface patchPersonIdParams {
    id: string
  }

  interface UpdatePersonDto {}
}
