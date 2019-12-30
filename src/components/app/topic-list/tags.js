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
  margin-left: 1rem;

  #modal {
    margin: 0;
  }

  .tag-list {
    display: flex;
    justify-content: space-between;
    min-width: 14rem;
    width: 14rem;
    max-width: 14rem;
    border-radius: 25px;
    overflow-x: scroll;
    border: 2px solid lime;
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
  inputValueList,
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
      addAction={() => handleAddNewTagInput()}
    >
      {/* TODO: Create a separate component for this form. */}
      {toggleShowModal => (
        <StyledForm
          onSubmit={e => {
            e.preventDefault()
            handleAddNewTag({ inputValueList })
            toggleShowModal(false)
          }}
        >
          <div>
            {inputValueList.map((inputValue, idx) => {
              return (
                <div id="tag-input-container" key={`tag-${idx}`}>
                  <div id="form-fields">
                    <input
                      type="text"
                      value={getTagInputValue({ index: idx })}
                      onChange={e =>
                        setTagInputValue({
                          index: idx,
                          newValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    id="xicon-container"
                    onClick={() => removeTagInputValue({ index: idx })}
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
  const [tagInputList, setTagInputList] = useState([""])
  const [inputListErrorPositions, setInputListErrorPositions] = useState([])

  const handleAddNewTag = ({ inputValueList }) => {
    let validTags = true

    inputValueList.map((tagValue, idx) => {
      if (tagValue.length >= 3 && tagValue.length <= 25) return
      setInputListErrorPositions([...inputListErrorPositions, idx])
      validTags = false
    })

    if (validTags) {
      if (type === "TOPIC") {
        addTopicTags({
          tags: inputValueList,
          topic_id: topicId,
        })
      }
      if (type === "NOTE") {
        addNoteTags({
          tags: inputValueList,
          note_id: noteId,
        })
      }
      setInputListErrorPositions([])
      setTagInputList([""])
    }
  }

  const getTagInputValue = ({ index }) => tagInputList[index]

  const setTagInputValue = ({ index, newValue }) => {
    setTagInputList([
      ...tagInputList.slice(0, index),
      newValue,
      ...tagInputList.slice(index + 1, tagInputList.length),
    ])
  }

  const removeTagInputValue = ({ index }) => {
    if (tagInputList.length === 1) return
    setTagInputList([
      ...tagInputList.slice(0, index),
      ...tagInputList.slice(index + 1, tagInputList.length),
    ])
  }

  const handleAddNewTagInput = () => {
    setTagInputList([...tagInputList, ""])
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
            inputValueList={tagInputList}
            setTagInputValue={setTagInputValue}
            getTagInputValue={getTagInputValue}
            removeTagInputValue={removeTagInputValue}
            handleAddNewTagInput={handleAddNewTagInput}
            handleAddNewTag={handleAddNewTag}
            buttonType="SMALL"
          />
        )}
      </div>
      {/* TODO: Refactor... All of this is just to
      display the plus icon if tags are going to be listed */}
      {tags !== null && tags.length > 0 && (
        <NoTagsCreatedYetView
          inputValueList={tagInputList}
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
