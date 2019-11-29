import topicReducer, { topicInitialState } from "../topicReducer"
import {
  setCreatedTopic,
  setCreateTopicError,
  setTopicList,
} from "../../actions/topic"
import {
  createTopicResponse,
  listTopicsResponse,
} from "../../../test_fixture_data"

describe("topicReducer", () => {
  it("should return the initial state", () => {
    expect(topicReducer(undefined, { data: {} })).toEqual(topicInitialState)
  })

  it("setTopicList should set a normalized list of topics to the topicState and increments the corresponding offset by 20", () => {
    expect(topicReducer(undefined, setTopicList(listTopicsResponse))).toEqual({
      listTopicsOffset: 20,
      topics: {
        "1": { id: 1, title: "Topic1", note_id_list: [1, 2] },
        "2": { id: 2, title: "Topic2", note_id_list: [] },
      },
      listSharedTopicsOffset: 0,
      sharedTopics: {},
      createTopicError: null,
      topicListError: null,
      listSharedTopicsError: null,
    })
  })

  it("setCreatedTopic should append a newly created topic to the normalized topics", () => {
    const stateWithTopics = topicReducer(
      undefined,
      setTopicList(listTopicsResponse)
    )
    expect(
      topicReducer(stateWithTopics, setCreatedTopic(createTopicResponse))
    ).toEqual({
      listTopicsOffset: 20,
      topics: {
        "1": { id: 1, title: "Topic1", note_id_list: [1, 2] },
        "2": { id: 2, title: "Topic2", note_id_list: [] },
        "3": { id: 3, title: "Topic3", note_id_list: [] },
      },
      listSharedTopicsOffset: 0,
      sharedTopics: {},
      createTopicError: null,
      topicListError: null,
      listSharedTopicsError: null,
    })
  })
})
