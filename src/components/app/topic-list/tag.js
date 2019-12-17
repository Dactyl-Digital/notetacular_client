import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import XIcon from "../../shared/icons/x-icon"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0.4rem;
  width: 6.4rem;
  min-width: 6.4rem;
  border-radius: 25px;
  font-family: "Blinker", sans-serif;
  color: #fcfcfc;
  text-shadow: 0.1rem 0.1rem #1b7171;
  background: #11eef6;
  background: ${props => (props.type === "NOTE" ? "#fcfcfc" : null)};
  margin-right: 1rem;

  #tag-text-container {
    overflow-x: hidden;
    white-space: nowrap;
  }

  #tag-text {
    /* text-overflow: ellipsis; */
    &:hover {
      /* overflow: ${props => props.tagRightPosition > 144 && `auto`}; */
      /* text-overflow: ${props => props.tagRightPosition > 144 && `none`}; */
      color: ${props => props.tagRightPosition > 144 && `lime`};
      animation: slide-text 5s infinite;
    }
  }

  @keyframes slide-text {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(0);
      transform: ${props =>
        props.tagRightPosition > 144 &&
        `translateX(${props.tagRightPosition - 100}px)`};
      /* transform: translateX(-180px); */
      
    }
  }

  p {
    margin: 0.1rem;
    color: #fcfcfc;
    color: ${props => (props.type === "NOTE" ? "#11EEF6" : null)};
    font-size: 1.2rem;
    /* white-space: nowrap; */
  }

  svg {
    min-width: 1rem;
    width: 1rem;
    height: 1rem;
  }
`

// const Container = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   padding: 0.4rem 0.4rem;
//   width: 6.4rem;
//   min-width: 6.4rem;
//   border-radius: 25px;
//   font-family: "Blinker", sans-serif;
//   color: #fcfcfc;
//   text-shadow: 0.1rem 0.1rem #1b7171;
//   background: #11eef6;
//   background: ${props => (props.type === "NOTE" ? "#fcfcfc" : null)};
//   margin-right: 1rem;

//   #tag-text {
//     white-space: nowrap;
//     overflow: hidden;
//     /* text-overflow: ellipsis; */
//     &:hover {
//       /* overflow: ${props => props.tagRightPosition > 144 && `auto`}; */
//       /* text-overflow: ${props => props.tagRightPosition > 144 && `none`}; */
//       color: ${props => props.tagRightPosition > 144 && `orange`};
//       animation: slide-text 5s infinite;
//     }
//   }

//   @keyframes slide-text {
//     from {
//       transform: translateX(0);
//     }
//     to {
//       transform: ${props =>
//         props.tagRightPosition > 144 &&
//         `translateX(${-props.tagRightPosition - 180}px`};
//       /* transform: translateX(calc(-200%)); */
//     }
//   }

//   p {
//     margin: 0.1rem;
//     color: #fcfcfc;
//     color: ${props => (props.type === "NOTE" ? "#11EEF6" : null)};
//     font-size: 1.2rem;
//   }

//   svg {
//     min-width: 1rem;
//     width: 1rem;
//     height: 1rem;
//   }
// `

const Tag = ({ children, type, topicId, noteId }) => {
  const { removeTopicTag } = useTopicActions()
  const { removeNoteTag } = useNoteActions()
  const [tagRightPosition, setTagRightPosition] = useState(null)
  const tagRef = useRef(null)

  // TODO: Will more than likely end up removing the animation for this.
  // After imposing a max text length which the backend API will enforce
  // and just allow a width auto for tags
  useEffect(() => {
    if (!tagRightPosition) {
      if (tagRef.current !== null) {
        setTagRightPosition(tagRef.current.offsetParent.scrollWidth)
      }
    }
  }, [])

  return (
    <Container type={type} tagRightPosition={tagRightPosition}>
      <div id="tag-text-container">
        <p id="tag-text" ref={tagRef}>
          {children}
        </p>
      </div>
      <div
        onClick={() => {
          if (type === "TOPIC")
            removeTopicTag({ topic_id: topicId, tag: children })
          if (type === "NOTE") removeNoteTag({ note_id: noteId, tag: children })
        }}
      >
        <XIcon />
      </div>
    </Container>
  )
}

export default Tag
