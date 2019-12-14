import React, { useState } from "react"
import styled from "styled-components"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import Tag from "./tag"
import AddIcon from "../../shared/icons/add-icon"
import CreateResourceModal from "../../shared/create-resource-modal"

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 14rem;

  #modal {
    margin: 0;
  }

  .tag-list {
    display: flex;
    justify-content: space-between;
    width: 14rem;
    border-radius: 25px;
    overflow-x: scroll;
  }

  svg {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.6rem;
  }
`

const ExistingTagsView = ({ tags, type, topicId, noteId }) => (
  <>
    {tags.map(tag => (
      <Tag key={tag} type={type} topicId={topicId} noteId={noteId}>
        {tag}
      </Tag>
    ))}
    {/* TODO: Genericize /shared/Modal so that you can provide your own button and use that here */}
  </>
)

const NoTagsCreatedYetView = ({
  title,
  setTitle,
  IconComponent,
  handleAddNewTag,
  buttonType,
}) => {
  return (
    <CreateResourceModal
      resource="Tag"
      IconComponent={IconComponent ? IconComponent : null}
      buttonType={buttonType}
    >
      {/* TODO: Create a separate component for this form. */}
      {toggleShowModal => (
        <form
          onSubmit={e => {
            e.preventDefault()
            handleAddNewTag()
            toggleShowModal(false)
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button>Submit!</button>
        </form>
      )}
    </CreateResourceModal>
  )
}

// TODO: Add click and drag.
const Tags = ({ type, tags, topicId, noteId }) => {
  const { addTopicTags } = useTopicActions()
  const { addNoteTags } = useNoteActions()
  const [title, setTitle] = useState("")

  const handleAddNewTag = () => {
    if (title.length > 3) {
      if (type === "TOPIC") {
        addTopicTags({
          tags: [title],
          topic_id: topicId,
        })
      }
      if (type === "NOTE") {
        addNoteTags({
          tags: [title],
          note_id: noteId,
        })
      }
    }
    setTitle("")
  }

  return (
    <Container>
      <div className="tag-list">
        {tags.length > 0 ? (
          <>
            <ExistingTagsView
              type={type}
              tags={tags}
              topicId={topicId}
              noteId={noteId}
            />
            {/* <div onClick={() => console.log("CREATE_TAG")}>
              <AddIcon />
            </div> */}
          </>
        ) : (
          <NoTagsCreatedYetView
            title={title}
            setTitle={setTitle}
            handleAddNewTag={handleAddNewTag}
            buttonType="SMALL"
          />
        )}
      </div>
      {tags.length > 0 && (
        <NoTagsCreatedYetView
          title={title}
          setTitle={setTitle}
          IconComponent={AddIcon}
          buttonType="ICON"
          handleAddNewTag={handleAddNewTag}
        />
      )}
    </Container>
  )
}

export default Tags
