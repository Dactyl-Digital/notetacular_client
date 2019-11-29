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
      listNotesOffset: 20,
      notes: {
        "1": { id: 1, title: "Note1", note_timer_id_list: [1, 2] },
        "2": { id: 2, title: "Note2", note_timer_id_list: [] },
      },
      listSharedNotesOffset: 0,
      sharedNotes: {},
      createNoteError: null,
      noteListError: null,
      listSharedNotesError: null,
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
      listNotesOffset: 20,
      notes: {
        "1": { id: 1, title: "Note1", note_timer_id_list: [1, 2] },
        "2": { id: 2, title: "Note2", note_timer_id_list: [] },
        "3": { id: 3, title: "Note3", note_timer_id_list: [] },
      },
      listSharedNotesOffset: 0,
      sharedNotes: {},
      createNoteError: null,
      noteListError: null,
      listSharedNotesError: null,
    })
  })
})
