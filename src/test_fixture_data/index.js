const createAxiosSuccessResponse = data => ({
  data,
})

const createAxiosErrorResponse = data => ({
  response: {
    data,
  },
})

const normalizedNotebookList = {
  "1": { id: 1, title: "Notebook1" },
  "2": { id: 2, title: "Notebook2" },
}

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

export const signupErrorResponse = createAxiosErrorResponse({
  errors: {
    username: ["That username is already taken"],
    credentials: {
      email: ["That email is already taken"],
    },
  },
  message: undefined,
})

export const createNotebookResponse = createAxiosSuccessResponse({
  message: "Successfully created notebook!",
  data: {
    id: 3,
    title: "Notebook3",
    sub_category_id_list: [],
  },
})

export const listNotebooksResponse = createAxiosSuccessResponse({
  message: "Successfully listed notebooks!",
  data: {
    notebooks: [
      { id: 1, title: "Notebook1", sub_category_id_list: [1, 2] },
      { id: 2, title: "Notebook2", sub_category_id_list: [] },
    ],
  },
})

// TODO: Potential Notebook creation errors to be implemented:
// - User has already created a notebook with that title (don't think I coded that invariant on the backend yet).

export const createSubCategoryResponse = createAxiosSuccessResponse({
  message: "Successfully created sub category!",
  data: {
    id: 3,
    title: "SubCategory3",
    topic_id_list: [],
  },
})

export const listSubCategoriesResponse = createAxiosSuccessResponse({
  message: "Successfully listed sub categories!",
  data: {
    sub_categories: [
      { id: 1, title: "SubCategory1", topic_id_list: [1, 2] },
      { id: 2, title: "SubCategory2", topic_id_list: [] },
    ],
  },
})

export const createTopicResponse = createAxiosSuccessResponse({
  message: "Successfully created topic!",
  data: {
    id: 3,
    title: "Topic3",
    note_id_list: [],
  },
})

export const listTopicsResponse = createAxiosSuccessResponse({
  message: "Successfully listed topics!",
  data: {
    topics: [
      { id: 1, title: "Topic1", note_id_list: [1, 2] },
      { id: 2, title: "Topic2", note_id_list: [] },
    ],
  },
})

export const createNoteResponse = createAxiosSuccessResponse({
  message: "Successfully created note!",
  data: {
    id: 3,
    title: "Note3",
    note_timer_id_list: [],
  },
})

export const listNotesResponse = createAxiosSuccessResponse({
  message: "Successfully listed notes!",
  data: {
    notes: [
      { id: 1, title: "Note1", note_timer_id_list: [1, 2] },
      { id: 2, title: "Note2", note_timer_id_list: [] },
    ],
  },
})

export const serverError = createAxiosErrorResponse({
  message: "Oops... Something went wrong.",
})
