import {
  SET_CREATED_SUB_CATEGORY,
  SET_SUB_CATEGORY_LIST,
  SET_NOTEBOOKS_SUB_CATEGORIES,
  SET_NOTEBOOKS_SUB_CATEGORIES_ERROR,
  LIST_SHARED_SUB_CATEGORIES,
  REMOVE_DELETED_SUB_CATEGORY,
  SET_DELETE_SUB_CATEGORY_ERROR,
  SET_CREATE_SUB_CATEGORY_ERROR,
  SET_SUB_CATEGORY_LIST_ERROR,
  SET_LIST_SHARED_SUB_CATEGORY_ERROR,
} from "../actions/subCategory"
import { checkProperty } from "./helpers"

// NOTE: This structure is meant to facilitate rendering the notes
// for each topic in the topicList view.
// parentNotebooksOfSubCategories: {
//   "1": {
//     subCategories: {
//       "1": {
//         id: 1,
//         notebook_id: 1,
//         title: "SubCategory1",
//       },
//       "2": { id: 2, notebook_id: 1, title: "SubCategory2" },
//       "3": { id: 3, notebook_id: 1, title: "SubCategory3" },
//     },
//     listOffset: 20,
//   },
// },

export const subCategoryInitialState = {
  parentNotebooksOfSubCategories: {},
  listSharedSubCategoriesOffset: 0,
  sharedSubCategories: {},
  createSubCategoryError: null,
  subCategoryListError: null,
  notebookSubCategoriesError: null,
  deleteSubCategoryError: null,
  listSharedSubCategoriesError: null,
}

const normalizeSingle = ({ parentNotebooksOfSubCategories }, { data }) => {
  const notebook_id = data.notebook_id
  const newSubCategories = checkProperty({
    obj: parentNotebooksOfSubCategories,
    property: notebook_id,
    failFn: () => ({
      [data.id]: data,
    }),
    recursiveFn: obj =>
      checkProperty({
        obj,
        property: "subCategories",
        successFn: () => ({
          ...obj["subCategories"],
          [data.id]: data,
        }),
        failFn: () => ({
          [data.id]: data,
        }),
      }),
  })
  const newListOffset = checkProperty({
    obj: parentNotebooksOfSubCategories,
    property: notebook_id,
    successFn: () => parentNotebooksOfSubCategories[notebook_id].listOffset + 1,
    failFn: () => 1,
  })
  // NOTE: Was just spreading the object that's in the successFn directly in
  // the returned object literal's subCategories object... but that caused
  // an error when the sub category being created is the first.
  const prevSubCategories = checkProperty({
    obj: parentNotebooksOfSubCategories,
    property: "subCategories",
    successFn: () => ({
      ...parentNotebooksOfSubCategories[notebook_id].subCategories,
    }),
    failFn: () => ({}),
  })
  return {
    [notebook_id]: {
      subCategoriesPaginationEnd: true,
      subCategories: {
        ...prevSubCategories,
        ...newSubCategories,
      },
      listOffset: newListOffset,
    },
  }
}

const normalize = key => (subCategoryState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    const subCategoriesPaginationEnd = data[key].length !== 20
    if (i === 0) {
      // NOTE: Doing this to ensure that listOffset is only incremented once while
      // iterating through the list of notes retrieved from the API.
      if (acc[resource.notebook_id]) {
        // Updating a current topic's notes
        acc = {
          ...acc,
          [resource.notebook_id]: {
            ...acc[resource.notebook_id],
            subCategoriesPaginationEnd,
            subCategories: {
              ...acc[resource.notebook_id].subCategories,
              [resource.id]: resource,
            },
            listOffset:
              subCategoryState.parentTopicsOfNotes[resource.notebook_id]
                .listOffset + data[key].length,
          },
        }
      } else {
        // Creating a new entry for a topic's notes
        acc[resource.notebook_id] = {
          subCategoriesPaginationEnd,
          subCategories: {
            [resource.id]: resource,
          },
          listOffset: data[key].length,
        }
      }
    } else {
      // TODO: THIS ELSE LOGIC IS DUPLICATED (w/ one slight modification) ABOVE!
      // DO SOMETHING ABOUT THIS MESS
      // Updating a current topic's notes
      acc = {
        ...acc,
        [resource.notebook_id]: {
          ...acc[resource.notebook_id],
          subCategoriesPaginationEnd,
          subCategories: {
            ...acc[resource.notebook_id].subCategories,
            [resource.id]: resource,
          },
        },
      }
    }
    return acc
  }, {})

const normalizeSubCategories = normalize("sub_categories")

export default function subCategoryReducer(
  subCategoryState = subCategoryInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_SUB_CATEGORY) {
    return {
      ...subCategoryState,
      parentNotebooksOfSubCategories: {
        ...subCategoryState.parentNotebooksSubCaparentNotebooksOfSubCategoriescs,
        ...normalizeSingle(subCategoryState, payload),
      },
    }
  }
  if (type === SET_SUB_CATEGORY_LIST) {
    return subCategoryListNewState(subCategoryState, payload)
  }
  if (type === SET_NOTEBOOKS_SUB_CATEGORIES) {
    return subCategoryListNewState(subCategoryState, payload)
  }
  if (type === REMOVE_DELETED_SUB_CATEGORY) {
    const { notebook_id, sub_category_id } = payload
    delete subCategoryState.parentNotebooksOfSubCategories[notebook_id]
      .subCategories[sub_category_id]
    return {
      ...subCategoryState,
      parentNotebooksOfSubCategories: {
        ...subCategoryState.parentNotebooksOfSubCategories,
        [notebook_id]: {
          ...subCategoryState.parentNotebooksOfSubCategories[notebook_id],
          sub_categories: {
            ...subCategoryState.parentNotebooksOfSubCategories[notebook_id]
              .sub_categories,
          },
          listOffset:
            subCategoryState.parentNotebooksOfSubCategories[notebook_id]
              .listOffset - 1,
        },
      },
    }
  }
  // if (type === LIST_SHARED_SUB_CATEGORIES) {
  //   return { ...subCategoryState, successfulSignup: true }
  // }
  if (type === SET_CREATE_SUB_CATEGORY_ERROR) {
    return { ...subCategoryState, createSubCategoryError: payload }
  }
  if (type === SET_SUB_CATEGORY_LIST_ERROR) {
    return { ...subCategoryState, subCategoryListError: payload }
  }
  if (type === SET_NOTEBOOKS_SUB_CATEGORIES_ERROR) {
    return { ...subCategoryState, notebookSubCategoriesError: payload }
  }
  if (type === SET_DELETE_SUB_CATEGORY_ERROR) {
    return { ...subCategoryState, deleteSubCategoryError: payload }
  }
  // if (type === SET_LIST_SHARED_subCategoryS_ERROR) {
  //   return { ...subCategoryState, signinError: payload.errors }
  // }
  return subCategoryState
}

const subCategoryListNewState = (subCategoryState, payload) => ({
  ...subCategoryState,
  parentNotebooksOfSubCategories: {
    ...subCategoryState.parentNotebooksOfSubCategories,
    ...normalizeSubCategories(subCategoryState, payload),
  },
})
