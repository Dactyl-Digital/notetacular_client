export const SET_CREATED_TOPIC = "SET_CREATED_TOPIC"
export const SET_TOPIC_LIST = "SET_TOPIC_LIST"
export const SET_SUB_CATEGORY_TOPICS = "SET_SUB_CATEGORY_TOPICS"
export const SET_SUB_CATEGORY_TOPICS_ERROR = "SET_SUB_CATEGORY_TOPICS_ERROR"
export const LIST_SHARED_TOPICS = "LIST_SHARED_TOPICS"
export const REMOVE_DELETED_TOPIC = "REMOVE_DELETED_TOPIC"
export const SET_DELETE_TOPIC_ERROR = "SET_DELETE_TOPIC_ERROR"
export const SET_ADD_TOPIC_TAGS = "SET_ADD_TOPIC_TAGS"
export const SET_CREATE_TOPIC_ERROR = "SET_CREATE_TOPIC_ERROR"
export const SET_TOPIC_LIST_ERROR = "SET_TOPIC_LIST_ERROR"
export const SET_REMOVED_TOPIC_TAG = "SET_REMOVED_TOPIC_TAG"
export const SET_LIST_SHARED_TOPIC_ERROR = "SET_LIST_SHARED_TOPIC_ERROR"
export const UPDATE_TOPIC_NOTE_ID_LIST = "UPDATE_TOPIC_NOTE_ID_LIST"
export const SET_ADD_TOPIC_TAGS_ERROR = "SET_ADD_TOPIC_TAGS_ERROR"
export const SET_REMOVE_TOPIC_TAG_ERROR = "SET_REMOVE_TOPIC_TAG_ERROR"

export const setCreatedTopic = ({ data }) => ({
  type: SET_CREATED_TOPIC,
  payload: data,
  meta: {
    trigger:
      "POST to /api/topic was successful and created topic will be added to \
              the reducer's topics.",
  },
})

export const setCreateTopicError = ({ response: { data } }) => ({
  type: SET_CREATE_TOPIC_ERROR,
  payload: data,
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

// NOTE: The distinction between setSubCategoryTopics and
// setTopicList is that setSubCategoryTopics needs
// to facilitate when the user navigates directly to
// /notebooks/1/sub-category/2/topics for example.
export const setSubCategoryTopics = ({ data }) => ({
  type: SET_SUB_CATEGORY_TOPICS,
  payload: data,
  meta: {
    trigger:
      "GET to /api/sub-category/topics was successful and topics list will be added to \
              the reducer's topics.",
  },
})

export const setSubCategoryTopicsError = ({ response: { data } }) => ({
  type: SET_SUB_CATEGORY_TOPICS_ERROR,
  payload: data,
  meta: {
    trigger: "GET to /api/sub-category/topics failed.",
  },
})

export const updateTopicNoteIdList = ({ id, topic_id, sub_category_id }) => ({
  type: UPDATE_TOPIC_NOTE_ID_LIST,
  payload: { note_id: id, topic_id, sub_category_id },
  meta: {
    trigger:
      "A note associated with this topic was successfully created, and it is \
        necessary to update the topic's noteIdList otherwise all hell of errors will break loose.",
  },
})

export const removeDeletedTopic = ({ sub_category_id, topic_id }) => ({
  type: REMOVE_DELETED_TOPIC,
  payload: { sub_category_id, topic_id },
  meta: {
    trigger: "Topic was successfully deleted on the serverside.",
  },
})

export const setDeleteTopicError = ({ response: { data } }) => ({
  type: SET_DELETE_TOPIC_ERROR,
  payload: data,
  meta: {
    trigger: "Topic failed to be deleted on the serverside.",
  },
})

export const setAddedTopicTags = ({ data }) => ({
  type: SET_ADD_TOPIC_TAGS,
  payload: data,
  meta: {
    trigger: "A topic successfully had new tags added to it.",
  },
})

export const setAddedTopicTagsError = ({ response: { data } }) => ({
  type: SET_ADD_TOPIC_TAGS_ERROR,
  payload: data,
  meta: {
    trigger: "An error occured while attempting to add new tags to a topic.",
  },
})

export const setRemovedTopicTag = ({ data }) => ({
  type: SET_REMOVED_TOPIC_TAG,
  payload: data,
  meta: {
    trigger: "A topic successfully had a tag removed from it.",
  },
})

export const setRemoveTopicTagError = ({ response: { data } }) => ({
  type: SET_REMOVE_TOPIC_TAG_ERROR,
  payload: data,
  meta: {
    trigger: "An error occured while attempting to remove a tag from a topic.",
  },
})
