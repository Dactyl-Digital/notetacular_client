import axios from "axios"

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.notastical.com/api"
    : "http://localhost:4000/api"

export const SIGNUP_URL = `/signup`
export const LOGIN_URL = `/login`
export const LOGOUT_URL = `/logout`

export const SEARCH_URL = `/note/search`

// Notebook Action Endpoints
export const NOTEBOOK_URL = `/notebook`
export const LIST_NOTEBOOKS_URL = `/notebook?limit=20&offset=`
export const LIST_NOTEBOOKS_SUB_CATEGORIES_URL = `/notebook/sub-categories`

// Sub Category Action Endpoints
export const SUB_CATEGORY_URL = `/sub-category`
export const LIST_SUB_CATEGORIES_URL = `/sub-category?limit=20&offset=`
export const LIST_SUB_CATEGORY_TOPICS_URL = `/sub-category/topics`

// Topic Action Endpoints
export const TOPIC_URL = `/topic`
export const LIST_TOPICS_URL = `/topic?limit=20&offset=`
export const ADD_TOPIC_TAGS_URL = `/topic/tags`
export const REMOVE_TOPIC_TAG_URL = `/topic/tags`

// Note Action Endpoints
export const NOTE_URL = `/note`
export const LIST_NOTES_URL = `/note?limit=20&offset=`
export const UPDATE_NOTE_CONTENT_URL = `/note/content`
export const ADD_NOTE_TAGS_URL = `/note/tags`
export const REMOVE_NOTE_TAG_URL = `/note/tags`
export const SEARCH_NOTES_URL = `/note/search`

// Supports post, patch, delete
export const NOTE_TIMER_URL = `/note-timer`
export const LIST_NOTE_TIMERS_URL = `${NOTE_TIMER_URL}?limit=20&offset=`
