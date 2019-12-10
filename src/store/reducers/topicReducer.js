import {
  SET_CREATED_TOPIC,
  SET_TOPIC_LIST,
  LIST_SHARED_TOPICS,
  SET_CREATE_TOPIC_ERROR,
  SET_TOPIC_LIST_ERROR,
  SET_LIST_SHARED_TOPIC_ERROR,
  UPDATE_TOPIC_NOTE_ID_LIST,
} from "../actions/topic"
import { checkProperty } from "./helpers"

const parentSubCategoriesOfTopics = JSON.parse(
  localStorage.getItem("parentSubCategoriesOfTopics")
)

export const topicInitialState = {
  // listTopicsOffset: 0,
  // topics: {},
  parentSubCategoriesOfTopics: parentSubCategoriesOfTopics
    ? parentSubCategoriesOfTopics
    : {},
  listSharedTopicsOffset: 0,
  sharedTopics: {},
  createTopicError: null,
  topicListError: null,
  listSharedTopicsError: null,
}

const normalizeSingle = ({ parentSubCategoriesOfTopics }, { data }) => {
  const sub_category_id = data.sub_category_id
  const newTopics = checkProperty({
    obj: parentSubCategoriesOfTopics,
    property: sub_category_id,
    failFn: () => ({
      [data.id]: data,
    }),
    recursiveFn: obj =>
      checkProperty({
        obj,
        property: "topics",
        successFn: () => ({
          ...obj["topics"],
          [data.id]: data,
        }),
        failFn: () => ({
          [data.id]: data,
        }),
      }),
  })
  const newListOffset = checkProperty({
    obj: parentSubCategoriesOfTopics,
    property: sub_category_id,
    successFn: () =>
      parentSubCategoriesOfTopics[sub_category_id].listOffset + 1,
    failFn: () => 1,
  })
  return {
    [sub_category_id]: {
      topics: {
        ...newTopics,
      },
      listOffset: newListOffset,
    },
  }
}

const normalize = key => (noteState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    const topicsPaginationEnd = data[key].length !== 20
    if (i === 0) {
      // NOTE: Doing this to ensure that listOffset is only incremented once while
      // iterating through the list of notes retrieved from the API.
      if (acc[resource.sub_category_id]) {
        // Updating a current topic's notes
        acc = {
          ...acc,
          [resource.sub_category_id]: {
            ...acc[resource.sub_category_id],
            topicsPaginationEnd,
            topics: {
              ...acc[resource.sub_category_id].notes,
              [resource.id]: resource,
            },
            listOffset:
              noteState.parentTopicsOfNotes[resource.sub_category_id]
                .listOffset + data[key].length,
          },
        }
      } else {
        // Creating a new entry for a subCategory's topics
        acc[resource.sub_category_id] = {
          topicsPaginationEnd,
          topics: {
            [resource.id]: resource,
          },
          listOffset: data[key].length,
        }
      }
    } else {
      // TODO: THIS ELSE LOGIC IS DUPLICATED (w/ one slight modification) ABOVE!
      // DO SOMETHING ABOUT THIS MESS
      // Updating a current topic's notes
      acc = {
        ...acc,
        [resource.sub_category_id]: {
          ...acc[resource.sub_category_id],
          topicsPaginationEnd,
          topics: {
            ...acc[resource.sub_category_id].topics,
            [resource.id]: resource,
          },
        },
      }
    }
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
      parentSubCategoriesOfTopics: {
        ...topicState.topics,
        ...normalizeSingle(topicState, payload),
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
  if (type === UPDATE_TOPIC_NOTE_ID_LIST) {
    const spreadPrevIfArray = ({ notes }) => (Array.isArray(notes) ? notes : [])
    console.log("WHAT GETS RETURNED? spreadPrevIfArray")
    console.log(spreadPrevIfArray(topicState.topics[payload.topic_id]))
    return {
      ...topicState,
      topics: {
        ...topicState.topics,
        [payload.topic_id]: {
          ...topicState.topics[payload.topic_id],
          notes: [
            payload.note_id,
            ...spreadPrevIfArray(topicState.topics[payload.topic_id]),
          ],
        },
      },
    }
  }

  // if (type === SET_LIST_SHARED_topicS_ERROR) {
  //   return { ...topicState, signinError: payload.errors }
  // }
  return topicState
}

const topicListNewState = (topicState, payload) => {
  const result = normalizeTopics(topicState, payload)
  console.log("result of normalizeTopics: ")
  console.log(result)

  return {
    ...topicState,
    parentSubCategoriesOfTopics: {
      ...topicState.parentSubCategoriesOfTopics,
      ...result,
    },
  }
}
