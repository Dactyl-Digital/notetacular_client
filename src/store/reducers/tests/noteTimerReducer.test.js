import noteTimerReducer, { noteTimerInitialState } from "../noteTimerReducer"
import { setCreatedNoteTimer, setNoteTimerList } from "../../actions/note-timer"
import {
  createNoteTimerResponse,
  listNoteTimersResponse,
} from "../../../test_fixture_data"

describe("noteTimerReducer", () => {
  it("should return the initial state", () => {
    expect(noteTimerReducer(undefined, {})).toEqual(noteTimerInitialState)
  })

  it.only("setNoteList should set a normalized list of note timers to the noteTimerState and increments the corresponding offset by 2", () => {
    expect(
      noteTimerReducer(undefined, setNoteTimerList(listNoteTimersResponse))
    ).toEqual({
      parentNotesOfNoteTimers: {
        "1": {
          noteTimersPaginationEnd: true,
          note_timers: {
            "1": {
              id: 1,
              timer_count: 1,
              elapsed_seconds: 0,
              note_id: 1,
              description: null,
            },
            "2": {
              id: 2,
              timer_count: 2,
              elapsed_seconds: 0,
              note_id: 1,
              description: null,
            },
          },
          listOffset: 2,
        },
      },
      listSharedNoteTimersOffset: 0,
      sharedNoteTimers: {},
      createNoteTimerError: null,
      noteTimerListError: null,
      listSharedNoteTimersError: null,
      updateNoteTimerContentError: null,
    })
  })
})
