import React, { useState } from "react"
import styled from "styled-components"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import Tag from "./tag"
import AddIcon from "../../shared/icons/add-icon"
import XIcon from "../../shared/icons/x-icon"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"

// IMMEDIATE TODO:
// Look into the "offset is undefined error that pops up from
// attempting to list resources"... perhaps just catch it before the request
// is issued, but in the off case that it happens to be because redux state
// is becoming corrupted.. See where I didn't update state immutably in a correct manner.
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 14rem;
  border-radius: 25px;
  margin-left: 2rem;

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

  #tag-input-container {
    display: flex;
    align-items: center;
    width: 13.8rem;
    margin-bottom: 1rem;
    border: 2px solid #222;

    #xicon-container {
      display: flex;
      align-items: center;
      height: 100%;
    }

    svg {
      width: 0.8rem;
      height: 0.8rem;
      padding-left: 1rem;
      margin-bottom: 0;
    }

    /* #tag-xicon {
      margin-left: 0.6rem;
    } */
  }
`

// const TagInputContainer = styled.div`
//   display: flex;
//   align-items: center;
//   width: 13.8rem;
//   margin-bottom: 1rem;

//   #xicon-container {
//     display: flex;
//     align-items: center;
//     height: 100%;
//   }

//   svg {
//     width: 0.8rem;
//     height: 0.8rem;
//     margin-left: 0.6rem;
//     margin-bottom: 0;
//   }
// `

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
  inputKeys,
  setTagInputValue,
  getTagInputValue,
  removeTagInputValue,
  handleAddNewTagInput,
  IconComponent,
  handleAddNewTag,
  buttonType,
}) => {
  return (
    <CreateResourceModal
      resource="Tags"
      IconComponent={IconComponent ? IconComponent : null}
      buttonType={buttonType}
      addAction={() => handleAddNewTagInput({ count: inputKeys.length })}
    >
      {/* TODO: Create a separate component for this form. */}
      {toggleShowModal => (
        <StyledForm
          onSubmit={e => {
            e.preventDefault()
            handleAddNewTag({ keys: inputKeys })
            toggleShowModal(false)
          }}
        >
          <div>
            {inputKeys.map((key, idx) => {
              return (
                <div id="tag-input-container" key={`tag-${key}-${idx}`}>
                  <div id="form-fields">
                    <input
                      id="title"
                      type="text"
                      value={getTagInputValue({ count: idx })}
                      onChange={e =>
                        setTagInputValue({
                          count: idx,
                          newValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    id="xicon-container"
                    onClick={() => removeTagInputValue({ count: idx })}
                  >
                    <XIcon id="tag-xicon" />
                  </div>
                </div>
              )
            })}
          </div>
          <div id="form-button">
            <Button type="CREATE" size="SMALL">
              Submit!
            </Button>
          </div>
        </StyledForm>
      )}
    </CreateResourceModal>
  )
}

// TODO: Add click and drag.
const Tags = ({ type, tags, topicId, noteId }) => {
  const { addTopicTags } = useTopicActions()
  const { addNoteTags } = useNoteActions()
  const [tagInputList, setTagInputList] = useState({ "0": "" })

  const handleAddNewTag = ({ keys }) => {
    let validTags = true
    const tagList = keys.map(key => {
      const tag = tagInputList[key]
      if (tag.length >= 3 && tag.length <= 25) {
        return tag
      }
      validTags = false
    })

    if (validTags) {
      if (type === "TOPIC") {
        addTopicTags({
          tags: tagList,
          topic_id: topicId,
        })
      }
      if (type === "NOTE") {
        addNoteTags({
          tags: tagList,
          note_id: noteId,
        })
      }
    }
    setTagInputList({ inputs: { "0": "" } })
  }

  const getTagInputValue = ({ count }) => tagInputList[count]
  const setTagInputValue = ({ count, newValue }) => {
    setTagInputList({
      ...tagInputList,
      [count]: newValue,
    })
  }
  const removeTagInputValue = ({ count }) => {
    const keys = Object.keys(tagInputList)
    if (keys.length === 1) return
    const updatedInputs = keys.reduce((acc, key) => {
      if (Number(key) !== Number(count)) {
        acc[key] = tagInputList[key]
      }
      return acc
    }, {})
    setTagInputList({ ...updatedInputs })
  }
  const handleAddNewTagInput = ({ count }) => {
    setTagInputList({ ...tagInputList, [count]: "" })
  }

  return (
    <Container>
      <div className="tag-list">
        {tags !== null && tags.length > 0 ? (
          <>
            <ExistingTagsView
              type={type}
              tags={tags}
              topicId={topicId}
              noteId={noteId}
            />
          </>
        ) : (
          <NoTagsCreatedYetView
            inputKeys={Object.keys(tagInputList)}
            setTagInputValue={setTagInputValue}
            getTagInputValue={getTagInputValue}
            removeTagInputValue={removeTagInputValue}
            handleAddNewTagInput={handleAddNewTagInput}
            handleAddNewTag={handleAddNewTag}
            buttonType="SMALL"
          />
        )}
      </div>
      {tags !== null && tags.length > 0 && (
        <NoTagsCreatedYetView
          inputKeys={Object.keys(tagInputList)}
          setTagInputValue={setTagInputValue}
          getTagInputValue={getTagInputValue}
          removeTagInputValue={removeTagInputValue}
          handleAddNewTagInput={handleAddNewTagInput}
          handleAddNewTag={handleAddNewTag}
          IconComponent={AddIcon}
          buttonType="ICON"
          handleAddNewTag={handleAddNewTag}
        />
      )}
    </Container>
  )
}

export default Tags
