import noteReducer, { noteInitialState } from "../noteReducer"
import {
  setCreatedNote,
  setCreateNoteError,
  setNoteList,
} from "../../actions/note"
import {
  createNoteResponse,
  listNotesResponse,
} from "../../../test_fixture_data"

describe("noteReducer", () => {
  it("should return the initial state", () => {
    expect(noteReducer(undefined, { data: {} })).toEqual(noteInitialState)
  })

  it("setNoteList should set a normalized list of notes to the noteState and increments the corresponding offset by 20", () => {
    expect(noteReducer(undefined, setNoteList(listNotesResponse))).toEqual({
      parentTopicsOfNotes: {
        "1": {
          notes: {
            "1": {
              id: 1,
              topic_id: 1,
              title: "Note1",
              note_timer_id_list: [1, 2],
            },
            "2": { id: 2, topic_id: 1, title: "Note2", note_timer_id_list: [] },
          },
          listOffset: 2,
        },
      },
      listSharedNotesOffset: 0,
      sharedNotes: {},
      createNoteError: null,
      noteListError: null,
      listSharedNotesError: null,
      updateNoteContentError: null,
    })
  })

  it("setCreatedNote should append a newly created note to the normalized notes", () => {
    const stateWithNotes = noteReducer(
      undefined,
      setNoteList(listNotesResponse)
    )
    expect(
      noteReducer(stateWithNotes, setCreatedNote(createNoteResponse))
    ).toEqual({
      // NOTE: The "1" key at the top level object is the topic_id which the note list is associated with.
      parentTopicsOfNotes: {
        "1": {
          notes: {
            "1": {
              id: 1,
              topic_id: 1,
              title: "Note1",
              note_timer_id_list: [1, 2],
            },
            "2": { id: 2, topic_id: 1, title: "Note2", note_timer_id_list: [] },
            "3": { id: 3, topic_id: 1, title: "Note3", note_timer_id_list: [] },
          },
          listOffset: 3,
        },
      },
      listSharedNotesOffset: 0,
      sharedNotes: {},
      createNoteError: null,
      noteListError: null,
      listSharedNotesError: null,
      updateNoteContentError: null,
    })
  })
})
