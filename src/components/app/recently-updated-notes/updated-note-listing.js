import React from "react"

const UpdatedNoteListing = ({
  hierarchy: { mainCategory, subCategory, topic },
  updatedAt,
  noteContent,
}) => (
  <div>
    <h3>
      {mainCategory} * {subCategory} * {topic}
    </h3>
    <p>{updatedAt}</p>
    <p>
      {/* TODO: Determine optimal length to cut off at for design */}
      {noteContent}
    </p>
  </div>
)

export default UpdatedNoteListing
