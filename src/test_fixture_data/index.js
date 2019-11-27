const createAxiosSuccessResponse = data => ({
  data,
})

const createAxiosErrorResponse = data => ({
  response: {
    data,
  },
})

export const signupData = {
  username: "testuser",
  email: "test@test.com",
  password: "testpassword",
}

export const createNotebookData = {
  title: "Notebook1",
}

export const signupSuccessResponse = createAxiosSuccessResponse({
  message: "Please verify your email",
})

export const createNotebookResponse = createAxiosSuccessResponse({
  message: "Successfully created notebook!",
  data: {
    id: 1,
    title: "Notebook1",
  },
})

export const listNotebooksResponse = createAxiosSuccessResponse({
  notebooks: [{ id: 1, title: "Notebook1" }, { id: 2, title: "Notebook2" }],
})

// TODO: Potential Notebook creation errors to be implemented:
// - User has already created a notebook with that title (don't think I coded that invariant on the backend yet).

export const signupErrorResponse = createAxiosErrorResponse({
  errors: {
    username: ["That username is already taken"],
    credentials: {
      email: ["That email is already taken"],
    },
  },
  message: undefined,
})

export const serverError = createAxiosErrorResponse({
  message: "Oops... Something went wrong.",
})
