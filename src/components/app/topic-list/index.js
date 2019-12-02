import React, { useEffect } from "react"
import styled from "styled-components"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
// import TopicListing from "./topic-listing"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }
`

const TopicList = ({ subCategoryId }) => {
  const { subCategories } = useSubCategory()
  const { topics, listTopicsOffset } = useTopic()
  const { listTopics } = useTopicActions()

  // TODO: Genericize this b, make a reusable hook... as this is
  // repeated in notebook-list and sub-category-list
  useEffect(() => {
    const topicIdList = subCategories[subCategoryId].topics
    if (topicIdList.length > 0) {
      listTopics({
        offset: listTopicsOffset,
        topic_id_list: topicIdList,
      })
    }
  }, [])

  return (
    <Container>
      <Sidebar />
      <div id="main-content">
        <Heading title="Topics" />
        <div id="sub-category-list">
          {Object.keys(topics).map(key => (
            <ResourceListing
              key={topics[key].id.toString()}
              title={topics[key].title}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default TopicList
