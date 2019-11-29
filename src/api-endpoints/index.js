const API_URL = "http://localhost:4000"

export const SIGNUP_URL = `${API_URL}/api/signup`
export const LOGIN_URL = `${API_URL}/api/login`

// Notebook Action Endpoints
export const CREATE_NOTEBOOK_URL = `${API_URL}/api/notebook`
export const LIST_NOTEBOOKS_URL = `${API_URL}/api/notebook?limit=20&offset=`

// Sub Category Action Endpoints
export const CREATE_SUB_CATEGORY_URL = `${API_URL}/api/sub-category`
export const LIST_SUB_CATEGORIES_URL = `${API_URL}/api/sub-category?limit=20&offset=`
