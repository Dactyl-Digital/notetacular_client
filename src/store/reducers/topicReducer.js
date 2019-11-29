import {
  SET_CREATED_TOPIC,
  SET_TOPIC_LIST,
  LIST_SHARED_TOPICS,
  SET_CREATE_TOPIC_ERROR,
  SET_TOPIC_LIST_ERROR,
  SET_LIST_SHARED_TOPIC_ERROR,
} from "../actions/subCategory"
// import {helperFunction} from '../helpers'

export const topicInitialState = {
  listTopicsOffset: 0,
  topics: {},
  listSharedTopicsOffset: 0,
  sharedTopics: {},
  createtopicError: null,
  topicListError: null,
  listSharedTopicsError: null,
}

const normalizeSingle = ({ data }) => ({
  [data.id]: {
    ...data,
  },
})

// TODO: Move this into a helper folder.
const normalize = key => ({ data }) =>
  data[key].reduce((acc, resource) => {
    acc[resource.id] = resource
    return acc
  }, {})

const normalizeTopics = normalize("topics")

export default function topicReducer(
  topicState = topicInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_TOPIC) {
    return {
      ...topicState,
      topics: {
        ...topicState.topics,
        ...normalizeSingle(payload),
      },
    }
  }
  if (type === SET_TOPIC_LIST) {
    return topicListNewState(topicState, payload)
  }
  // if (type === LIST_SHARED_SUB_CATEGORIES) {
  //   return { ...topicState, successfulSignup: true }
  // }
  if (type === SET_CREATE_TOPIC_ERROR) {
    return { ...topicState, createTopicError: payload }
  }
  if (type === SET_TOPIC_LIST_ERROR) {
    return { ...topicState, topicListError: payload }
  }
  // if (type === SET_LIST_SHARED_topicS_ERROR) {
  //   return { ...topicState, signinError: payload.errors }
  // }
  return topicState
}

const topicListNewState = (topicState, payload) => ({
  ...topicState,
  topics: {
    ...topicState.topics,
    ...normalizeTopics(payload),
  },
  listTopicsOffset: topicState.listTopicsOffset + 20,
})
