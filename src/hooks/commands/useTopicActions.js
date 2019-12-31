import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedTopic,
  setCreateTopicError,
  setTopicList,
  setTopicListError,
  removeDeletedTopic,
  setDeleteTopicError,
  setAddedTopicTags,
  setAddedTopicTagsError,
  setRemovedTopicTag,
  setRemoveTopicTagError,
} from "../../store/actions/topic"
import {
  TOPIC_URL,
  LIST_TOPICS_URL,
  ADD_TOPIC_TAGS_URL,
  REMOVE_TOPIC_TAG_URL,
} from "../../api-endpoints"

export const createTopic = dispatch => createTopicData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: TOPIC_URL,
      payload: createTopicData,
      onSuccess: createTopicSuccess(dispatch),
      onError: createTopicError(dispatch),
    })
  )
}

const createTopicSuccess = dispatch => response => {
  dispatch(setCreatedTopic(response))
}

const createTopicError = dispatch => error => {
  dispatch(setCreateTopicError(error))
}

// Listing sub categories requires this to be sent on the request body:
// topic_id_list
export const listTopics = dispatch => ({ offset, topic_id_list }) => {
  dispatch(
    apiRequest({
      method: "GET",
      url: `${LIST_TOPICS_URL}${offset}`,
      payload: { topic_id_list },
      onSuccess: listTopicsSuccess(dispatch),
      onError: listTopicsError(dispatch),
    })
  )
}

const listTopicsSuccess = dispatch => response => {
  dispatch(setTopicList(response))
}

const listTopicsError = dispatch => error => {
  dispatch(setTopicListError(error))
}

export const deleteTopic = dispatch => ({ sub_category_id, topic_id }) => {
  dispatch(
    apiRequest({
      method: "DELETE",
      url: `${TOPIC_URL}/${topic_id}`,
      payload: {},
      onSuccess: deleteTopicSuccess({ sub_category_id, topic_id })(dispatch),
      onError: deleteTopicError(dispatch),
    })
  )
}

const deleteTopicSuccess = ({
  sub_category_id,
  topic_id,
}) => dispatch => _response => {
  dispatch(removeDeletedTopic({ sub_category_id, topic_id }))
}

const deleteTopicError = dispatch => error => {
  dispatch(setDeleteTopicError(error))
}

export const addTopicTags = dispatch => data => {
  console.log("Dispatching addTopicTags API REQUEST")
  dispatch(
    apiRequest({
      method: "POST",
      url: ADD_TOPIC_TAGS_URL,
      payload: data,
      onSuccess: addTopicTagsSuccess(dispatch),
      onError: addTopicTagsError(dispatch),
    })
  )
}

const addTopicTagsSuccess = dispatch => response => {
  dispatch(setAddedTopicTags(response))
}

const addTopicTagsError = dispatch => error => {
  dispatch(setAddedTopicTagsError(error))
}

export const removeTopicTag = dispatch => data => {
  dispatch(
    apiRequest({
      method: "PATCH",
      url: REMOVE_TOPIC_TAG_URL,
      payload: data,
      onSuccess: removeTopicTagSuccess(dispatch),
      onError: removeTopicTagError(dispatch),
    })
  )
}

const removeTopicTagSuccess = dispatch => response => {
  dispatch(setRemovedTopicTag(response))
}

const removeTopicTagError = dispatch => error => {
  dispatch(setRemoveTopicTagError(error))
}

export function useTopicActions() {
  const dispatch = useDispatch()

  return {
    createTopic: createTopic(dispatch),
    listTopics: listTopics(dispatch),
    deleteTopic: deleteTopic(dispatch),
    addTopicTags: addTopicTags(dispatch),
    removeTopicTag: removeTopicTag(dispatch),
  }
}
