import React from "react"
import UpdatedNoteListing from "./updated-note-listing"

const RecentlyUpdatedNotes = () => (
  <>
    <div>
      <h1>Your Recently Updated Notes</h1>
      <div>Search Icon</div>
    </div>
    <UpdatedNoteListing
      hierarchy={{
        mainCategory: "Javascript",
        subCategory: "Higher-Order Functions",
        topic: "Closure",
      }}
      updatedAt="11/20/2019"
      noteContent="Lorem ipsum dolor sit amet, consectetur adpiscing elit
               Proin faucibus dapibus elit ut varius. Aenean consequat
               ornare condimentum. Vivamus mauris lorem..."
    />
  </>
)

export default RecentlyUpdatedNotes
