import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedTopic,
  setCreateTopicError,
  setTopicList,
  setTopicListError,
} from "../../store/actions/topic"
import { CREATE_TOPIC_URL, LIST_TOPICS_URL } from "../../api-endpoints"

export const createTopic = dispatch => createTopicData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: CREATE_TOPIC_URL,
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
  console.log("listTopics called with:")
  console.log(`offset: ${offset}`)
  console.log("topic_id_list:")
  console.log(topic_id_list)
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

export function useTopicActions() {
  const dispatch = useDispatch()

  return {
    createTopic: createTopic(dispatch),
    listTopics: listTopics(dispatch),
  }
}
