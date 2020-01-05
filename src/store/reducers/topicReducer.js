import {
  SET_CREATED_TOPIC,
  SET_TOPIC_LIST,
  LIST_SHARED_TOPICS,
  REMOVE_DELETED_TOPIC,
  SET_DELETE_TOPIC_ERROR,
  SET_ADD_TOPIC_TAGS,
  SET_REMOVED_TOPIC_TAG,
  SET_CREATE_TOPIC_ERROR,
  SET_TOPIC_LIST_ERROR,
  SET_LIST_SHARED_TOPIC_ERROR,
  UPDATE_TOPIC_NOTE_ID_LIST,
} from "../actions/topic"
import { checkProperty } from "./helpers"

export const topicInitialState = {
  parentSubCategoriesOfTopics: {},
  listSharedTopicsOffset: 0,
  sharedTopics: {},
  createTopicError: null,
  topicListError: null,
  deleteTopicError: null,
  listSharedTopicsError: null,
}

const normalizeSingle = ({ parentSubCategoriesOfTopics }, { data }) => {
  const { sub_category_id } = data
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

  const prevTopics = checkProperty({
    obj: parentSubCategoriesOfTopics,
    property: "topics",
    successFn: () => ({
      ...parentSubCategoriesOfTopics[sub_category_id].topics,
    }),
    failFn: () => ({}),
  })

  return {
    [sub_category_id]: {
      topicsPaginationEnd: true,
      topics: {
        ...prevTopics,
        ...newTopics,
      },
      listOffset: newListOffset,
    },
  }
}

const normalizeSingleUpdate = ({ parentSubCategoriesOfTopics }, { data }) => {
  const { sub_category_id } = data
  const updatedTopic = checkProperty({
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
          [data.id]: {
            ...obj["topics"][data.id],
            tags: data.tags,
          },
        }),
        failFn: () => {
          console.log("if failFn executes, you fucked up.")
        },
      }),
  })
  return {
    [sub_category_id]: {
      topics: {
        ...parentSubCategoriesOfTopics[sub_category_id].topics,
        ...updatedTopic,
      },
    },
  }
}

const normalize = key => (noteState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    const topicsPaginationEnd = data[key].length !== 20
    console.log("topicsPaginationEnd: ")
    console.log(topicsPaginationEnd)
    if (i === 0) {
      // NOTE: Doing this to ensure that listOffset is only incremented once while
      // iterating through the list of notes retrieved from the API.
      if (acc[resource.sub_category_id]) {
        // Updating a current topic's notes
        acc = {
          ...acc,
          [resource.sub_category_id]: {
            ...acc[resource.sub_category_id],
            topicsPaginationEnd: topicsPaginationEnd,
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
          topicsPaginationEnd: topicsPaginationEnd,
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
          topicsPaginationEnd: topicsPaginationEnd,
          topics: {
            ...acc[resource.sub_category_id].topics,
            [resource.id]: resource,
          },
          listOffset: data[key].length,
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
    console.log("result of normalizeSingle(topicState, payload): ")
    console.log(normalizeSingle(topicState, payload))
    return {
      ...topicState,
      parentSubCategoriesOfTopics: {
        ...topicState.parentSubCategoriesOfTopics,
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
  if (type === SET_ADD_TOPIC_TAGS) {
    return {
      ...topicState,
      parentSubCategoriesOfTopics: {
        ...topicState.parentSubCategoriesOfTopics,
        ...normalizeSingleUpdate(topicState, payload),
      },
    }
  }
  if (type === SET_REMOVED_TOPIC_TAG) {
    return {
      ...topicState,
      parentSubCategoriesOfTopics: {
        ...topicState.parentSubCategoriesOfTopics,
        ...normalizeSingleUpdate(topicState, payload),
      },
    }
  }
  if (type === SET_CREATE_TOPIC_ERROR) {
    return { ...topicState, createTopicError: payload }
  }
  if (type === SET_TOPIC_LIST_ERROR) {
    return { ...topicState, topicListError: payload }
  }
  if (type === SET_DELETE_TOPIC_ERROR) {
    return { ...topicState, deleteTopicError: payload }
  }
  if (type === REMOVE_DELETED_TOPIC) {
    const { sub_category_id, topic_id } = payload
    delete topicState.parentSubCategoriesOfTopics[sub_category_id].topics[
      topic_id
    ]
    return {
      ...topicState,
      parentSubCategoriesOfTopics: {
        ...topicState.parentSubCategoriesOfTopics,
        [sub_category_id]: {
          ...topicState.parentSubCategoriesOfTopics[sub_category_id],
          topics: {
            ...topicState.parentSubCategoriesOfTopics[sub_category_id].topics,
          },
          listOffset:
            topicState.parentSubCategoriesOfTopics[sub_category_id].listOffset -
            1,
        },
      },
    }
  }
  if (type === UPDATE_TOPIC_NOTE_ID_LIST) {
    const spreadPrevIfArray = ({ notes }) => (Array.isArray(notes) ? notes : [])

    return {
      ...topicState,
      parentSubCategoriesOfTopics: {
        ...topicState.parentSubCategoriesOfTopics,
        [payload.sub_category_id]: {
          ...topicState.parentSubCategoriesOfTopics[payload.sub_category_id],
          topics: {
            ...topicState.parentSubCategoriesOfTopics[payload.sub_category_id]
              .topics,
            [payload.topic_id]: {
              ...topicState.parentSubCategoriesOfTopics[payload.sub_category_id]
                .topics[payload.topic_id],
              notes: [
                payload.note_id,
                ...spreadPrevIfArray(
                  topicState.parentSubCategoriesOfTopics[
                    payload.sub_category_id
                  ].topics[payload.topic_id]
                ),
              ],
            },
          },
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
