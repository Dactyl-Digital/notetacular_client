export const SET_CREATED_TOPIC = "SET_CREATED_TOPIC"
export const SET_TOPIC_LIST = "SET_TOPIC_LIST"
export const LIST_SHARED_TOPICS = "LIST_SHARED_TOPICS"
export const SET_CREATE_TOPIC_ERROR = "SET_CREATE_TOPIC_ERROR"
export const SET_TOPIC_LIST_ERROR = "SET_TOPIC_LIST_ERROR"
export const SET_LIST_SHARED_TOPIC_ERROR = "SET_LIST_SHARED_TOPIC_ERROR"

export const setCreatedTopic = ({ data }) => ({
  type: SET_CREATED_TOPIC,
  payload: data,
  meta: {
    trigger:
      "POST to /api/topic was successful and created topic will be added to \
              the reducer's topics.",
  },
})

export const setCreateTopicError = error => ({
  type: SET_CREATE_TOPIC_ERROR,
  payload: error,
  meta: {
    trigger: "Server failed to create topic.",
  },
})

export const setTopicList = ({ data }) => ({
  type: SET_TOPIC_LIST,
  payload: data,
  meta: {
    trigger:
      "POST to /api/topic was successful and created topic will be added to \
              the reducer's topics.",
  },
})

export const setTopicListError = ({ response: { data } }) => ({
  type: SET_TOPIC_LIST_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to list topics.",
  },
})
