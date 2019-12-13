import noteTimerReducer, { noteTimerInitialState } from "../noteTimerReducer"
import {
  setCreatedNoteTimer,
  setNoteTimerList,
  setUpdatedNoteTimer,
  setDeletedNoteTimer,
} from "../../actions/note-timer"
import {
  createNoteTimerResponse,
  listNoteTimersResponse,
  updateNoteTimerResponse,
  deletedNoteTimerResponse,
} from "../../../test_fixture_data"

describe("noteTimerReducer", () => {
  it("should return the initial state", () => {
    expect(noteTimerReducer(undefined, {})).toEqual(noteTimerInitialState)
  })

  it("setNoteList should set a normalized list of note timers to the noteTimerState and increments the corresponding offset by 2", () => {
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
      updateNoteTimerError: null,
    })
  })

  it("setCreatedNoteTimer should append a newly created note timer to the normalized note timers", () => {
    const stateWithNoteTimers = noteTimerReducer(
      undefined,
      setNoteTimerList(listNoteTimersResponse)
    )

    expect(
      noteTimerReducer(
        stateWithNoteTimers,
        setCreatedNoteTimer(createNoteTimerResponse)
      )
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
            "3": {
              id: 3,
              timer_count: 3,
              elapsed_seconds: 0,
              note_id: 1,
              description: null,
            },
          },
          listOffset: 3,
        },
      },
      listSharedNoteTimersOffset: 0,
      sharedNoteTimers: {},
      createNoteTimerError: null,
      noteTimerListError: null,
      listSharedNoteTimersError: null,
      updateNoteTimerError: null,
    })
  })

  it("setUpdatedNoteTimer should update the note timer in the noteTimer redux state", () => {
    const stateWithNoteTimers = noteTimerReducer(
      undefined,
      setNoteTimerList(listNoteTimersResponse)
    )

    expect(
      noteTimerReducer(
        stateWithNoteTimers,
        setUpdatedNoteTimer({ note_id: 1, ...updateNoteTimerResponse })
      )
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
              elapsed_seconds: 120,
              note_id: 1,
              description: "Updated was a great success!",
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
      updateNoteTimerError: null,
    })
  })

  it.only("setDeletedNoteTimer should remove the note timer from the noteTimer redux state", () => {
    const stateWithNoteTimers = noteTimerReducer(
      undefined,
      setNoteTimerList(listNoteTimersResponse)
    )

    console.log("the deletedNoteTimerResponse")
    console.log(deletedNoteTimerResponse)

    expect(
      noteTimerReducer(
        stateWithNoteTimers,
        setDeletedNoteTimer({ note_id: 1, ...deletedNoteTimerResponse })
      )
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
          },
          listOffset: 1,
        },
      },
      listSharedNoteTimersOffset: 0,
      sharedNoteTimers: {},
      createNoteTimerError: null,
      noteTimerListError: null,
      listSharedNoteTimersError: null,
      updateNoteTimerError: null,
    })
  })
})
