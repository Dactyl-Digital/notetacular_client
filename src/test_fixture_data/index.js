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
  title: "Notebook3",
  sub_category_id_list: [],
}

export const createSubCategoryData = {
  title: "SubCategory3",
  topic_id_list: [],
}

export const createTopicData = {
  title: "Topic3",
  note_id_list: [],
}

export const createNoteData = {
  topic_id: 1,
  title: "Note3",
  note_timer_id_list: [],
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
    notebook_id: 1,
    title: "SubCategory3",
    topic_id_list: [],
  },
})

export const listSubCategoriesResponse = createAxiosSuccessResponse({
  message: "Successfully listed sub categories!",
  data: {
    sub_categories: [
      { id: 1, notebook_id: 1, title: "SubCategory1", topic_id_list: [1, 2] },
      { id: 2, notebook_id: 1, title: "SubCategory2", topic_id_list: [] },
    ],
  },
})

export const createTopicResponse = createAxiosSuccessResponse({
  message: "Successfully created topic!",
  data: {
    id: 3,
    sub_category_id: 1,
    title: "Topic3",
    note_id_list: [],
  },
})

export const listTopicsResponse = createAxiosSuccessResponse({
  message: "Successfully listed topics!",
  data: {
    topics: [
      { id: 1, sub_category_id: 1, title: "Topic1", note_id_list: [1, 2] },
      { id: 2, sub_category_id: 1, title: "Topic2", note_id_list: [] },
    ],
  },
})

// NOTE: topicId isn't actually returned from the API
// This is just required to be provided to the action which updates
// the topic's note_id_list to append the newly created note_id for
// facilitating the listNotes operation.
// topicId: 1,
export const createNoteResponse = createAxiosSuccessResponse({
  message: "Successfully created note!",
  data: {
    id: 3,
    topic_id: 1,
    title: "Note3",
    note_timer_id_list: [],
  },
})

export const listNotesResponse = createAxiosSuccessResponse({
  message: "Successfully listed notes!",
  data: {
    notes: [
      { id: 1, topic_id: 1, title: "Note1", note_timer_id_list: [1, 2] },
      { id: 2, topic_id: 1, title: "Note2", note_timer_id_list: [] },
    ],
  },
})

export const createNoteTimerResponse = createAxiosSuccessResponse({
  message: "Successfully created note timer!",
  data: {
    id: 3,
    timer_count: 3,
    elapsed_seconds: 0,
    description: null,
    note_id: 1,
  },
})

// TODO: Implement this route on the backend
export const listNoteTimersResponse = createAxiosSuccessResponse({
  message: "Successfully listed note timers!",
  data: {
    note_timers: [
      {
        id: 1,
        timer_count: 1,
        elapsed_seconds: 0,
        description: null,
        note_id: 1,
      },
      {
        id: 2,
        timer_count: 2,
        elapsed_seconds: 0,
        description: null,
        note_id: 1,
      },
    ],
  },
})

export const updateNoteTimerResponse = createAxiosSuccessResponse({
  message: "Successfully updated the note timer!",
  data: {
    id: 2,
    description: "Updated was a great success!",
    elapsed_seconds: 120,
  },
})

export const deletedNoteTimerResponse = createAxiosSuccessResponse({
  message: "Successfully deleted the note timer!",
  data: {
    id: 2,
  },
})

export const serverError = createAxiosErrorResponse({
  message: "Oops... Something went wrong.",
})
